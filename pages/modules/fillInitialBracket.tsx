import { Match, Participant } from "@g-loot/react-tournament-brackets/dist/src/types"
import Competitor from "./Competitor"

//function to fill in only the matches that contain at minimum 1 player
export async function fillInitialBracket(data:any,playerList:Competitor[],bracketIDs:number[])
{
    console.log("fill initial was called")
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

            participant.isWinner=false
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
            participant.isWinner=false
            setList[i].participants.push(participant)
        }


    }


 
    return setList

}
