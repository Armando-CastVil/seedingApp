
import { Match,Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "./Competitor";
import getRating from "./getRating";
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

    
    console.log(fillInitial(data,playerList,bracketIDs))
    




   /* generateSets(data,playerList,matchList).then((value)=>
    {
        matchList=value
        console.log(matchList)
    })*/

   
    
    //return matchList

   
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
        //obtained from the database


        playerList[i]=entry;
    }

    //assign ratings to each player
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

/*
async function generateSets(data:any,playerList:Competitor[],matchList:MatchStructure)
{

    var setList:Match[]=[]
    var finalMatchList:MatchStructure={
        upper:[],
        lower:[]
    }
    //this loop creates a set and assigns it an ID as long as it isnt an empty set
    for(let i=0;i<data.event.phaseGroups[0].sets.nodes.length;i++)
    {
        
        setList[i]=
        {
            id:data.event.phaseGroups[0].sets.nodes[i].id,
            name:data.event.phaseGroups[0].sets.nodes[i].identifier,
            nextMatchId:null,
            nextLooserMatchId: undefined,
            tournamentRoundText: "",
            startTime: "",
            state: 'DONE' ,
            participants:[]

        }
    }
    //for loop to assign next matchID in both winners and losers
    for(let i=0;i<setList.length;i++)
    {
        
        for(let j=0;j<setList.length;j++)
        {
            for(let k=0;k<data.event.phaseGroups[0].sets.nodes[j].slots.length;k++)
            {
            

               if( setList[i].id==data.event.phaseGroups[0].sets.nodes[j].slots[k].prereqId)
               {
                   //there are four possible scenarios for next match, winners to winners, winners to losers, losers to losers and losers to winners
                   
                   //assigning nextlosersmatchid
                   if(data.event.phaseGroups[0].sets.nodes[i].round<0)
                   {
                       //losers bracket to losers bracket and losers bracket to elimination
                       //a participant cannot be sent to losers bracket if they are already in losers so it is set to undefined
                       setList[i].nextLooserMatchId=undefined
                       setList[i].nextMatchId=data.event.phaseGroups[0].sets.nodes[j].id
                   }
                   //if they are in winners and get sent to next winners round
                   else if(data.event.phaseGroups[0].sets.nodes[i].round>0 && data.event.phaseGroups[0].sets.nodes[j].round>0)
                   {
                    setList[i].nextMatchId=data.event.phaseGroups[0].sets.nodes[j].id
                   }
                   ////if they are in winners and get sent to next losers round
                   else if(data.event.phaseGroups[0].sets.nodes[i].round>0 && data.event.phaseGroups[0].sets.nodes[j].round<0)
                   {
                    setList[i].nextLooserMatchId=data.event.phaseGroups[0].sets.nodes[j].id
                   }
               }
            }
        }
    }
    //end of for loop to assign next match id

    //for loop to fill in the participants slot, matchlist is full after this
    
    for(let i=0;i<setList.length;i++)
    {
        if((data.event.phaseGroups[0].sets.nodes[i].slots[0].seed!=null)&&(data.event.phaseGroups[0].sets.nodes[i].slots[1].seed!=null))
        {
            console.log("we are good until here")
            var participant1:Participant=
            {
                id:playerList[bracketIDs.indexOf(data.event.phaseGroups[0].sets.nodes[i].slots[0].seed.id)].bracketID,
                resultText: null,
                isWinner: compareSeeds(bracketIDs.indexOf(data.event.phaseGroups[0].sets.nodes[i].slots[0].seed.id),bracketIDs.indexOf(data.event.phaseGroups[0].sets.nodes[i].slots[1].seed.id)),
                status: null,
                name:playerList[bracketIDs.indexOf(data.event.phaseGroups[0].sets.nodes[i].slots[0].seed.id)].tag
                
            }

    
            var participant2:Participant=
            {
                id:playerList[bracketIDs.indexOf(data.event.phaseGroups[0].sets.nodes[i].slots[1].seed.id)].bracketID,
                resultText: null,
                isWinner: compareSeeds(bracketIDs.indexOf(data.event.phaseGroups[0].sets.nodes[i].slots[1].seed.id),bracketIDs.indexOf(data.event.phaseGroups[0].sets.nodes[i].slots[0].seed.id)),
                status: null,
                name:playerList[bracketIDs.indexOf(data.event.phaseGroups[0].sets.nodes[i].slots[1].seed.id)].tag
            }

            setList[i].participants.push(participant1)
            setList[i].participants.push(participant2)

            if(data.event.phaseGroups[0].sets.nodes[i].round>0)
            {

                finalMatchList.upper.push(setList[i])
            }
            else
            {
                setList[i].nextLooserMatchId=undefined
                finalMatchList.lower.push(setList[i]) 
            }


        }
    }
    return finalMatchList
}*/

//function to fill in only the matches that contain at minimum 1 player
function fillInitial(data:any,playerList:Competitor[],bracketIDs:number[]):Match[]
{
    console.log(bracketIDs.length)
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