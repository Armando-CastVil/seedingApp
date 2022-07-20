import Competitor from "./Competitor";
import { setPlayerInfo } from "./setPlayerInfo";

export default async function getPlayerListFromPhase(data:any)
{
    //playerList is an array of competitor objects
    var playerList:Competitor[]=[]

    //sets attributes for Competitor objects and stores them in the playerlist array
    //also assigns their bracket ID to their corresponding index in the bracketID array
    await setPlayerInfo(data).then((value: Competitor[])=>
        {
            playerList=value
               
        })
}