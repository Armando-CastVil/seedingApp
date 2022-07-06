import { Match } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "./Competitor";

interface MatchStructure
{
    upper:Match[],
    lower:Match[]
}
export default function setProjectedPath(matchList:MatchStructure,playerList:Competitor[],bracketIDs:number[])
{

    //set players from projected path in Winners
    for(let i=0;i<matchList.upper.length;i++)
    {
        playerList[bracketIDs.indexOf(matchList.upper[i].participants[0].id as number)].addPlayerToPath(matchList.upper[i].participants[1])
        playerList[bracketIDs.indexOf(matchList.upper[i].participants[1].id as number)].addPlayerToPath(matchList.upper[i].participants[0])
        
    }

     //set players from projected path in Winners
     for(let i=0;i<matchList.lower.length;i++)
     {
         playerList[bracketIDs.indexOf(matchList.lower[i].participants[0].id as number)].addPlayerToPath(matchList.lower[i].participants[1])
         playerList[bracketIDs.indexOf(matchList.lower[i].participants[1].id as number)].addPlayerToPath(matchList.lower[i].participants[0])
         
     }

     return playerList
}