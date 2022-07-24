
import Competitor from "./Competitor"




export default function assignBracketIds(data:any,playerList:Competitor[])
{


   for(let i=0;data.phaseGroup.seeds.nodes.length;i++)
   {
    playerList[i].bracketID=data.phaseGroup.seeds.nodes[i].id
   }
    
    return playerList
}
