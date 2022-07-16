import { Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "./Competitor";
import { setPlayerInfo } from "./setPlayerInfo";

export default async function getParticipantList(data:any)
{
    var playerList:Competitor[]=[]
    await setPlayerInfo(data).then((value: Competitor[])=>
        {
            playerList=value
                 
        })

    return playerList

}