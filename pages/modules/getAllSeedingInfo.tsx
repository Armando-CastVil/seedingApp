import { Match,Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "./Competitor";
import { fillInitialBracket } from "./fillInitialBracket";
import { setPlayerInfo } from "./setPlayerInfo";
import setRating from "./setRating";
import { setResults } from "./setResults";
import sortByRating from "./sortByRating";


//interface for the object we will be returning
interface MatchStructure
{
    upper:Match[],
    lower:Match[]
}

//start of function
export default async function getAllSeedingInfo(data:any)
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

    //this array holds only the sets that have results that have been set during a given round
    var setsWithResults:any=[]
    //set data to each player, list is already sorted by rating
    playerList=await setPlayerInfo(data)
    
    
    //sets attributes for Competitor objects and stores them in the playerlist array
    //also assigns their bracket ID to their corresponding index in the bracketID array
    await setPlayerInfo(data).then((value: Competitor[])=>
        {
            playerList=value
            for(let i=0;i<playerList.length;i++)
            {
                bracketIDs[i]=value[i].bracketID
            }
        })

    //fills the bracket from only the initially available data
    setList=await fillInitialBracket(data,playerList,bracketIDs)
    console.log("intiial value:")
    console.log(setList)
    
        

    
    /*
    for(let i=0;i<10;i++)
    {
        console.log("ROUND: "+ i)
        await getResults(setList,bracketIDs).then((value)=>
        {
            
            setList=value.setList
            console.log(setList)
            setsWithResults=value.setsWithResults
            console.log(setsWithResults)
        })

        setList=await setResults(data,playerList,bracketIDs,setList,setsWithResults)
        console.log("after setResults")
        {
            setList
        }
        setsWithResults=[];
    
    }

    await fillFinalMatches(setList,data,matchList).then((value)=>
    {
        matchList=value
        
    })
    matchList=await errorElimination(matchList)
    console.log(matchList)
    return matchList*/
    
    
}

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
    
    return {setList,
        setsWithResults}
}
//place the sets that will be displayed in the final match structure
async function fillFinalMatches(setList:Match[],data:any,matchList:MatchStructure)
{


    for(let i=0;i<setList.length;i++)
    {
        if(setList[i].participants.length==2 && setList[i].nextMatchId!=undefined)
        {
            if(data.phaseGroup.sets.nodes[i].round>0)
            {
                matchList.upper.push(setList[i])
            }
            else
            {
                matchList.lower.push(setList[i])
            }
                
        }

        
    }
    
    return matchList
}

async function errorElimination(matchList:MatchStructure)
{
    matchList.upper[matchList.upper.length-1].nextMatchId=null
    
    return matchList
}


