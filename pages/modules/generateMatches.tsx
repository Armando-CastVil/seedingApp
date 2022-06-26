
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

    //Fill matches that have at minimum one player, only needs to be
    await fillInitial(data,playerList,bracketIDs).then((value)=>
    {
        
        generateSets(data,playerList,bracketIDs,value).then((sets)=>
        {
        console.log("sets from generate sets"+sets.length)
        console.log(sets)
        })
    })
    
    
   /*await generateSets(data,playerList,bracketIDs,setList).then((value)=>
    {
        console.log("sets from generate sets"+value.length)
        console.log(value)
    })*/
   /* generateSets(data,playerList,matchList).then((value)=>
    {
        matchList=value
        console.log(matchList)
    })*/

   
    
    //return matchList

   
}

async function generateSets(data:any,playerList:Competitor[],bracketIDs:any[],setList:Match[])
{

    
    //do this for the amount of rounds, i dont know the actual formula so this will do for now
    var rounds=3*Math.ceil(Math.log2(playerList.length))+1
    console.log("round: "+ rounds)
    for(let r=0;r<rounds;r++)
    {
        
        //find out winner and loser and push them in to their corresponding next matches
        for(let i=0;i<setList.length;i++)
        {
            
            var winner:Participant;
            var loser:Participant;
            //if a set has 2 participants and neither has been set as a winner, meaning match hasn't been processed
            if(setList[i].participants.length==2 && (setList[i].participants[0].isWinner==false)&&(setList[i].participants[1].isWinner==false))
            {
                console.log(setList[i].participants.length)
                //find out the winner of the set and assign them to their corresponding variable
                if(bracketIDs.indexOf(setList[i].participants[0].id)<bracketIDs.indexOf(setList[i].participants[1].id))
                {  
                    setList[i].participants[0].isWinner=true
                    setList[i].participants[1].isWinner=false
                    winner=setList[i].participants[0]
                    loser=setList[i].participants[1]
                }    
                else
                {
                    setList[i].participants[0].isWinner=false
                    setList[i].participants[1].isWinner=true
                    winner=setList[i].participants[1]
                    loser=setList[i].participants[0]
                }
                console.log("Match: "+setList[i].name)
                console.log("winner:"+winner.name)
                console.log("loser:"+loser.name)
            }
            
        
            //find out their corresponding matches and push them in to them
            //find the next sets and push their corresponding participants
            for(let j=0;j<data.phaseGroup.sets.nodes.length;j++)
            {
                
                for(let k=0;k<data.phaseGroup.sets.nodes[j].slots.length;k++)
                {
                    
                    //if the current set(setList[i]) is a prerequisite, then this match is the match that follows
                    if(setList[i].id==data.phaseGroup.sets.nodes[j].slots[k].prereqId)
                    {
                        //the possible scenarios for a participant are: winners bracket to winners bracket, winners to losers, 
                        //losers to losers, and losers to winners(only in case of losers finals)

                        //if the current set and the next set are in winners
                        if(data.phaseGroup.sets.nodes[i].round>0 && data.phaseGroup.sets.nodes[j].round>0)
                        {
                            //assign the next set as this sets next match
                            setList[i].nextMatchId=data.phaseGroup.sets.nodes[j].id

                            //push the winner in to the next set
                            setList[j].participants.push(winner!)
                        }

                        //if the current set is in winners and the next set is in losers
                        if(data.phaseGroup.sets.nodes[i].round>0 && data.phaseGroup.sets.nodes[j].round<0)
                        {
                         //assign the next set as this sets next match
                         setList[i].nextLooserMatchId=data.phaseGroup.sets.nodes[j].id
 
                         //push the loser in to the next set
                         setList[j].participants.push(loser!)
                     
                        }
                        //if the current set is in losers and the next set is in losers
                        if(data.phaseGroup.sets.nodes[i].round<0 && data.phaseGroup.sets.nodes[j].round<0)
                        {
                          //assign the next set as this sets next match
                          setList[i].nextMatchId=data.phaseGroup.sets.nodes[j].id
  
                          //push the loser in to the next set
                          setList[j].participants.push(winner!)
                        }

                        //if the current set is in losers and the next set is in winners
                        if(data.phaseGroup.sets.nodes[i].round<0 && data.phaseGroup.sets.nodes[j].round>0)
                        {
                          //assign the next set as this sets next match
                          setList[i].nextMatchId=data.phaseGroup.sets.nodes[j].id
  
                          //push the loser in to the next set
                          setList[j].participants.push(winner!)
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

function compareSeeds(seed1:number,seed2:number)
{
    if(seed1<seed2)
    {
        return true
    }
    else
    return false
}