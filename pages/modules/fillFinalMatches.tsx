import { Match } from "@g-loot/react-tournament-brackets/dist/src/types"

//interface for the object we will be returning
interface MatchStructure
{
    upper:Match[],
    lower:Match[]
}

//place the sets that will be displayed in the final match structure
export async function fillFinalMatches(setList:Match[],data:any,matchList:MatchStructure)
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
