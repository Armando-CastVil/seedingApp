import { Match,Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "./Competitor";
import  fillInitialBracket from "./fillInitialBracket";
import { setPlayerInfo } from "./setPlayerInfo";
import setProjectedPath from "./setProjectedPath";
import { setResults } from "./setResults";



//interface for the object we will be returning
interface MatchStructure
{
    upper:Match[],
    lower:Match[]
}

//start of function
export default async function seed(data:any,playerList:Competitor[])
{
    //initializing arrays

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

  
    //also assigns their bracket ID to their corresponding index in the bracketID array
    for(let i=0;i<playerList.length;i++)
    {
        bracketIDs[i]=playerList[i].bracketID
    }

            
        

        
   
    
    //fills the bracket from only the initially available data
    setList=fillInitialBracket(data,playerList,bracketIDs)
    let tempSetList=JSON.parse(JSON.stringify(setList))
   // console.log(setList)
    
    for(let i=0;i<10;i++)
    {
       // console.log("ROUND: "+ i)
        await getResults(tempSetList,bracketIDs).then((value)=>
        {
            
            tempSetList=JSON.parse(JSON.stringify(value.setList))
           // console.log(tempSetList)
            setsWithResults=[...value.setsWithResults]
            //console.log(setsWithResults)
        })

        tempSetList=JSON.parse(JSON.stringify(await setResults(data,playerList,bracketIDs,tempSetList,setsWithResults)))
        
        
        setsWithResults=[];
    
    }

    await fillFinalMatches(tempSetList,data,matchList).then((value)=>
    {
        matchList=value
        
    })
    matchList=await errorElimination(matchList)
   
    console.log("returning matchlist")
    console.log(matchList)
    return matchList
    

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
                if(bracketIDs.indexOf(setList[i].participants[0].bracketID)<bracketIDs.indexOf(setList[i].participants[1].bracketID))
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

