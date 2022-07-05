import { Match } from "@g-loot/react-tournament-brackets/dist/src/types"

//get matches with 2 participants, and assign them their status as winners or losers
export async function getResults(setList:Match[],bracketIDs:any[])
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
