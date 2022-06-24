
import { Match,Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "./Competitor";
import getRating from "./getRating";
import setRating from "./setRating";
import sortByRating from "./sortByRating";

interface MatchStructure
{
    upper:Match[],
    lower:Match[]
}


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
   await setPlayerInfo(data).then((value: Competitor[])=>
    {
        playerList=value
    })
    

    generateSets(data,playerList,matchList).then((value)=>
    {
        matchList=value
        console.log(matchList)
    })
   
    
    return matchList

   
}


//function that fills an array composed of all the competitors along with the necessary data like id,tag,rating, and bracketid
async function setPlayerInfo(data:any)
{
    var playerList:Competitor[]=[];
    var ID="";
    var tag="";
    var rating=0;
    var bracketID=0;

    for(let i=0;i<data.event.phaseGroups[0].seeds.nodes.length;i++)
    {

        
        ID=data.event.phaseGroups[0].seeds.nodes[i].players[0].id
        tag=data.event.phaseGroups[0].seeds.nodes[i].players[0].gamerTag
        getRating(ID).then((value:number)=>
        {
            rating=value
        })

        
        let  entry= new Competitor(ID,tag,rating,bracketID,0)
        playerList[i]=entry;
    }

   await setRating(playerList).then((value)=>{
       playerList=value
    })
    
   playerList= sortByRating(playerList)
   for(let i=0;i<playerList.length;i++)
   {
    playerList[i].bracketID=data.event.phaseGroups[0].seeds.nodes[i].id
    playerList[i].setSeed(i+1);
   }


   return playerList;
}//end of setPlayerInfo() function

//
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
                if(setList[i].id==data.event.phaseGroups[0].sets.nodes[j].slots[k].prereqId)
                {
                    if(data.event.phaseGroups[0].sets.nodes[j].round>0)
                    {
                        setList[i].nextLooserMatchId=data.event.phaseGroups[0].sets.nodes[j].id
                    }
                    else 
                    {
                        setList[i].nextMatchId=data.event.phaseGroups[0].sets.nodes[j].id
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
            
            var participant1:Participant=
            {
                id:playerList[getSeed(playerList,data.event.phaseGroups[0].sets.nodes[i].slots[0].seed.id)].bracketID,
                resultText: null,
                isWinner: compareSeeds(getSeed(playerList,data.event.phaseGroups[0].sets.nodes[i].slots[0].seed.id),getSeed(playerList,data.event.phaseGroups[0].sets.nodes[i].slots[1].seed.id)),
                status: null,
                name:playerList[getSeed(playerList,data.event.phaseGroups[0].sets.nodes[i].slots[0].seed.id)].tag
            }

            var participant2:Participant=
            {
                id:playerList[getSeed(playerList,data.event.phaseGroups[0].sets.nodes[i].slots[1].seed.id)].bracketID,
                resultText: null,
                isWinner: compareSeeds(getSeed(playerList,data.event.phaseGroups[0].sets.nodes[i].slots[1].seed.id),getSeed(playerList,data.event.phaseGroups[0].sets.nodes[i].slots[0].seed.id)),
                status: null,
                name:playerList[getSeed(playerList,data.event.phaseGroups[0].sets.nodes[i].slots[1].seed.id)].tag
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
}

function getSeed(playerList:Competitor[],id:number)
{
    let seed:number=-1
    for(let i=0;i<playerList.length;i++)
        {
        if(playerList[i].bracketID=id)
            {
                seed=i
            }
        }
    return seed
}
function compareSeeds(seed1:number,seed2:number)
{
    if(seed1>seed2)
    {
        return true
    }
    else
    return false
}