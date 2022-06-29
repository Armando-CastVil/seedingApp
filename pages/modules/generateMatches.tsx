
import { Match,Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "./Competitor";
import setRating from "./setRating";
import sortByRating from "./sortByRating";

//interface for the object we will be returning
interface MatchStructure
{
    upper:Match[],
    lower:Match[]
}


//start of function
export default async function generateMatches(data:any)
{

    //initializing arrays
    var playerList:Competitor[]=[]
    var setList:Match[]=[];
    var matchList:MatchStructure=
    {
        upper:[],
        lower:[]
    }

    //this array holds the bracket ids of all the players in order of their seeding to
    //make looking them up easier using the indexof method
    var bracketIDs:any=[]

    //sets attributes for Competitor objects and stores them in the playerlist array
   await setPlayerInfo(data).then((value: Competitor[])=>
    {
        playerList=value
        for(let i=0;i<playerList.length;i++)
         {
            bracketIDs[i]=value[i].bracketID
         }
    })

    //Fill matches that have at minimum one player, only needs to be called once
    await fillInitial(data,playerList,bracketIDs).then((value)=>
    {
        
        setList=value
    })
    
    //generate the sets
    await generateSets(data,playerList,bracketIDs,setList).then((value)=>
    {
        setList=value
        //console.log(value)
        let counter=0;
        for(let i=0;i<setList.length;i++)
        {
            if(setList[i].participants.length==2)
            {
                //console.log(setList[i].name)
            }
        }
        
    })
   
    
   
   
    
    //return matchList

   
}

async function generateSets(data:any,playerList:Competitor[],bracketIDs:any[],setList:Match[])
{
    
    //variable to store the index of sets with at least 2 players
    var setsWithResults:number[];
    
    //do this for the amount of rounds, i dont know the actual formula so this will do for now
    var rounds=3*Math.ceil(Math.log2(playerList.length))+1
    for(let r=0;r<rounds;r++)
    {   

    
        await getResults(setList,bracketIDs).then((value)=>
        {
            setList=value.setList
            setsWithResults=value.setsWithResults 
           // console.log(setsWithResults)
            
        })
        
        await setResults(data,playerList,bracketIDs,setList,setsWithResults!).then((value)=>
        {
            setList=value
            
            
        })
    }
   
    
    return setList
                                                
}      

//get matches with 2 participants, and assign them their status as winners or losers
async function getResults(setList:Match[],bracketIDs:any[])
{
   
    let setsWithResults:number[]=[]
    
    //find out winner and loser and push them in to their corresponding next matches
    for(let i=0;i<setList.length;i++)
    { 
        //if a set has 2 participants and neither has been set as a winner, meaning match hasn't been processed
        if(setList[i].participants.length==2 && (setList[i].participants[0].isWinner==false)&&(setList[i].participants[1].isWinner==false))
            {
                //store the indexes of sets that have 2 players
                setsWithResults.push(i)
                
                //find out the winner of the set and assign them to their corresponding variable
                if(bracketIDs.indexOf(setList[i].participants[0].id)<bracketIDs.indexOf(setList[i].participants[1].id))
                {  
                    setList[i].participants[0].isWinner=true
                    setList[i].participants[1].isWinner=false
    
                }    
                else
                {
                    setList[i].participants[0].isWinner=false
                    setList[i].participants[1].isWinner=true
                }

                
               
            }
    }
    //console.log(setList)
    return {setList,
        setsWithResults}
}

 //find out their corresponding matches and push them in to them

async function setResults(data:any,playerList:Competitor[],bracketIDs:any[],setList:Match[],setsWithResults:number[])
{
  
    //will go through all the sets that have results filled in
    for(let i=0;i<setsWithResults.length;i++)
    {
        //find out the next match that the players in this set will advance to
        //checks the data obtained from the api, specifically the nodes that contain set info
        for(let j=0;j<data.phaseGroup.sets.nodes.length;j++)
        {
            //check each slot to see if the set with results is a prerequisite
            for(let k=0;k<data.phaseGroup.sets.nodes[j].slots.length;k++)
            {
                //if the current set(setList[i]) is a prerequisite, then this match is the match that follows
                if(setList[setsWithResults[i]].id==data.phaseGroup.sets.nodes[j].slots[k].prereqId)
                {
                    console.log(setList[setsWithResults[i]].name+" is a prerequisite to"+data.phaseGroup.sets.nodes[j].identifier)
                    //the possible scenarios for a participant are: winners bracket to winners bracket, winners to losers, 
                    //losers to losers, and losers to winners(only in case of losers finals)

                    //if the current set and the next set are in winners
                    if(data.phaseGroup.sets.nodes[setsWithResults[i]].round>0 && data.phaseGroup.sets.nodes[j].round>0)
                    {
                        console.log("both sets are in winners")
                        //assign the next set as this sets next match
                        setList[setsWithResults[i]].nextMatchId=getNextNonByeMatch(data,data.phaseGroup.sets.nodes[j]).id
                        console.log(setList[setsWithResults[i]].name+"s next winners match is "+data.phaseGroup.sets.nodes[j].identifier)
                        //push the winner in to the next set
                        if(setList[setsWithResults[i]].participants[0].isWinner)
                        {
                            console.log(setList[setsWithResults[i]].participants[0].name+" is the winner")
                            //make a copy of the participant but with winner status set to false
                            var tempWinner:Participant=setList[setsWithResults[i]].participants[0]
                            tempWinner.isWinner=false
                            setList[j].participants.push(tempWinner)
                            console.log(setList[setsWithResults[i]].participants[0].name+' will be pushed in to'+setList[j].name)
                            setList[setsWithResults[i]].participants[0].isWinner=true
                            
                        }
                        else
                        {
                            //make a copy of the participant but with winner status set to false
                            var tempWinner:Participant=setList[setsWithResults[i]].participants[1]
                            tempWinner.isWinner=false
                            setList[j].participants.push(tempWinner)
                            console.log(setList[setsWithResults[i]].participants[1].name+' will be pushed in to'+setList[j].name)
                            setList[setsWithResults[i]].participants[1].isWinner=true
                        }
                        
                        


                    }
                    //if the current set is in winners and the next set is in losers
                    if(data.phaseGroup.sets.nodes[setsWithResults[i]].round>0 && data.phaseGroup.sets.nodes[j].round<0)
                    {
                        console.log(data.phaseGroup.sets.nodes[setsWithResults[i]].identifier+" is in winners and "+data.phaseGroup.sets.nodes[j].identifier+" is in losers")
                        //assign the next set as this sets next match
                        setList[setsWithResults[i]].nextLooserMatchId=getNextNonByeMatch(data,data.phaseGroup.sets.nodes[j]).id
                        console.log(setList[setsWithResults[i]].name+" next match in losers is "+getNextNonByeMatch(data,data.phaseGroup.sets.nodes[j]).identifier)
                        //push the loser in to the next set
                         if(setList[setsWithResults[i]].participants[0].isWinner==false)
                         {
                             for(let c=0;c<setList.length;c++)
                             {

                                 if(setList[c].id==setList[setsWithResults[i]].nextLooserMatchId)
                                 {
                                    setList[c].participants.push(setList[setsWithResults[i]].participants[0])
                                    break
                                 }
                             }
                           
                         }
                        else
                        {

                            if(setList[setsWithResults[i]].participants[0].isWinner==false)
                            {
                                
                                for(let c=0;c<setList.length;c++)
                                {
   
                                    
                                    if(setList[c].id==setList[setsWithResults[i]].nextLooserMatchId)
                                    {
                                       
                                       setList[c].participants.push(setList[setsWithResults[i]].participants[0])
                                       break
                                    }
                                }
                              
                            }
                           
                        }
                 
                    }
                    //if the current set is in losers and the next set is in losers
                    if(data.phaseGroup.sets.nodes[setsWithResults[i]].round<0 && data.phaseGroup.sets.nodes[j].round<0)
                    {
                        //assign the next set as this sets next match
                        setList[setsWithResults[i]].nextMatchId=getNextNonByeMatch(data,data.phaseGroup.sets.nodes[j])
                        setList[setsWithResults[i]].nextLooserMatchId=undefined

                        //push the winner in to the next set
                        if(setList[setsWithResults[i]].participants[0].isWinner==true)
                            { 
                            //make a copy of the participant but with winner status set to false
                            var tempWinner:Participant=setList[setsWithResults[i]].participants[0]
                            tempWinner.isWinner=false
                            for(let c=0;c<setList.length;c++)
                            {
                                if(setList[c].id==getNextNonByeMatch(data,data.phaseGroup.sets.nodes[j]).id)
                                {
                                   setList[c].participants.push(tempWinner)
                                   break
                                }
                            }
                          
                            setList[setsWithResults[i]].participants[0].isWinner=true
                            }
                        else
                            {
                            //make a copy of the participant but with winner status set to false
                            var tempWinner:Participant=setList[setsWithResults[i]].participants[1]
                            tempWinner.isWinner=false
                            for(let c=0;c<setList.length;c++)
                            {
                                if(setList[c].id==getNextNonByeMatch(data,data.phaseGroup.sets.nodes[j]).id)
                                {
                                   setList[c].participants.push(tempWinner)
                                   break
                                }
                            }
                            setList[setsWithResults[i]].participants[1].isWinner=true
                            }
                    }  
                    

                    //if the current set is in losers and the next set is in winners
                    if(data.phaseGroup.sets.nodes[setsWithResults[i]].round<0 && data.phaseGroup.sets.nodes[j].round>0)
                    {
                        //assign the next set as this sets next match
                        setList[setsWithResults[i]].nextMatchId=getNextNonByeMatch(data,data.phaseGroup.sets.nodes[j])

                        //push the winner in to the next set
                        if(setList[setsWithResults[i]].participants[0].isWinner==true)
                        {
                            //make a copy of the participant but with winner status set to false
                            var tempWinner:Participant=setList[setsWithResults[i]].participants[0]
                            tempWinner.isWinner=false
                            setList[j].participants.push(tempWinner)
                            setList[setsWithResults[i]].participants[0].isWinner=true
                        }
                        else
                        {
                             //make a copy of the participant but with winner status set to false
                             var tempWinner:Participant=setList[setsWithResults[i]].participants[1]
                             tempWinner.isWinner=false
                            setList[j].participants.push(tempWinner)
                            setList[setsWithResults[i]].participants[1].isWinner=true
                        }
                    }
                }
            }          
        }
    }
    return setList
}

        
     
    



//function that fills an array composed of all the competitors along with the necessary data like id,tag,rating, and bracketid
async function setPlayerInfo(data:any)
{
    //initialize variables
    var playerList:Competitor[]=[];
    var ID="";
    var tag="";
    var bracketID=0;

    //obtains the attributes from the data obtained from the API call and assigns them
    //to the corresponding variable  
    for(let i=0;i<data.phaseGroup.seeds.nodes.length;i++)
    {
        //obtained from api  
        ID=data.phaseGroup.seeds.nodes[i].players[0].id
        tag=data.phaseGroup.seeds.nodes[i].players[0].gamerTag
        bracketID=0;

        //initialize a Competitor object and push it in to the array
        let  entry= new Competitor(ID,tag,0,bracketID,0)
        playerList[i]=entry;
    }

    //assign ratings to each player obtained from the database
    const ratedList=await setRating(playerList)
    //sort by player
    playerList=sortByRating(ratedList)
   //set bracketIDs to the sorted list, the bracketID now corresponds to a seed
   for(let i=0;i<playerList.length;i++)
   {
    playerList[i].bracketID=data.phaseGroup.seeds.nodes[i].id
    playerList[i].setSeed(i+1);
   }
   return playerList;
}//end of setPlayerInfo() function



//function to fill in only the matches that contain at minimum 1 player
async function fillInitial(data:any,playerList:Competitor[],bracketIDs:number[])
{
    
    //the sets with at least one player will be stored here
    var setList:Match[]=[]
    //go through all the sets
    for(let i=0;i<data.phaseGroup.sets.nodes.length;i++)
    {
        setList[i]=
        {
            id:data.phaseGroup.sets.nodes[i].id,
            name:data.phaseGroup.sets.nodes[i].identifier,
            nextMatchId:null,
            nextLooserMatchId: undefined,
            tournamentRoundText: "",
            startTime: "",
            state: 'DONE' ,
            participants:[]

        }
        if(data.phaseGroup.sets.nodes[i].slots[0].seed !=null)
        {
            var participant:Participant=
            {
                id:playerList[bracketIDs.indexOf(data.phaseGroup.sets.nodes[i].slots[0].seed.id)].bracketID,
                resultText: null,
                isWinner:false,
                status: null,
                name:playerList[bracketIDs.indexOf(data.phaseGroup.sets.nodes[i].slots[0].seed.id)].tag
                
            }

            setList[i].participants.push(participant) 
        }

        if(data.phaseGroup.sets.nodes[i].slots[1].seed !=null)
        {
            var participant:Participant=
            {
                id:playerList[bracketIDs.indexOf(data.phaseGroup.sets.nodes[i].slots[1].seed.id)].bracketID,
                resultText: null,
                isWinner:false,
                status: null,
                name:playerList[bracketIDs.indexOf(data.phaseGroup.sets.nodes[i].slots[1].seed.id)].tag
                
            }

            setList[i].participants.push(participant)
        }


    }

    return setList

}

function getNextNonByeMatch(data:any, nextMatchObject:any)
{

   console.log("calling get nextnonbyematch with node "+nextMatchObject.identifier)
    var stopFlag=false;

    //if the next match has no byes, then return it
    if(nextMatchObject.slots[0].prereqType!="bye"&&nextMatchObject.slots[1].prereqType!="bye")
    {
        console.log(nextMatchObject.identifier+" has no byes")
        return nextMatchObject
    }
    //if it has a bye, find the next match's next match
    if(nextMatchObject.slots[0].prereqType=="bye"||nextMatchObject.slots[1].prereqType=="bye")
    {
        console.log(nextMatchObject.identifier+" has byes")
        for(let j=0;j<data.phaseGroup.sets.nodes.length;j++)
        {
            //check each slot to see if the set with results is a prerequisite
            console.log("checking slots")
            for(let k=0;k<data.phaseGroup.sets.nodes[j].slots.length;k++)
            {
                //this means that node[j] is its next match
                if(nextMatchObject.id==data.phaseGroup.sets.nodes[j].slots[k].prereqId)
                    {   
                        console.log(nextMatchObject.identifier+"s next match is "+ data.phaseGroup.sets.nodes[j])
                        nextMatchObject=data.phaseGroup.sets.nodes[j]
                        console.log("the new next match object is "+ nextMatchObject.identifier)
                    }
               
                    //if the next match also has a bye
                    if(nextMatchObject.slots[0].prereqType=="bye"||nextMatchObject.slots[1].prereqType=="bye")
                    {
                        console.log(nextMatchObject.identifier+" has byes")
                        nextMatchObject=getNextNonByeMatch(data,nextMatchObject) 

                        if(nextMatchObject.slots[0].prereqType!="bye"&&nextMatchObject.slots[1].prereqType!="bye")
                        {
                            console.log(nextMatchObject.identifier+" has no byes")
                            return nextMatchObject
                        }
                        
                            
                    }
                    else if(nextMatchObject.slots[0].prereqType!="bye"&&nextMatchObject.slots[1].prereqType!="bye")
                    {
                        stopFlag=true
                        console.log(nextMatchObject.identifier+" has no byes")
                        return nextMatchObject
                        
                    }
                
            }

            if(stopFlag)
            {
                break
            }
            
        }

      
        
    
    }


}
