import { Match, Participant } from "@g-loot/react-tournament-brackets/dist/src/types"
import Competitor from "../Competitor"

//generic info for a bye
var bye:Participant=
{
    bracketID: 0,
    isWinner: false,
    tag: "Bye",
    smashggID: "",
    rating: 0,
    projectedPath: [],
    seed: 0,
    region: undefined,
    carpool: undefined
}
//this function fills in only the sets that have data for both participants already before tournament start
//byes count as a participant, so bye vs player, player vs player and bye vs bye. These are the initial rounds
export default function fillInitialRounds(data:any,playerList:Competitor[])
{
    //the sets will be stored here
    var setList:Match[]=[]

    //this array holds the bracket ids of all the players in order of their seeding to
    //make looking them up easier using the indexof method
    var bracketIDs:any=[]
    //also assigns their bracket ID to their corresponding index in the bracketID array
    for(let i=0;i<playerList.length;i++)
    {
        bracketIDs[i]=playerList[i].bracketID
        
    }

    //go through all the sets 
    for(let i=0;i<data.phaseGroup.sets.nodes.length;i++)
    {
        //set the attributes that dont depend on participants
        setList[i]=
        {
            id:data.phaseGroup.sets.nodes[i].id,
            name:data.phaseGroup.sets.nodes[i].identifier,
            nextMatchId:null,
            nextLooserMatchId: undefined,
            tournamentRoundText: "",
            participants:[]

        }
        //if it's the first round
        if(data.phaseGroup.sets.nodes[i].round==1)
        {
            //if seed does not equal null, it means there's a player in that slot
            if(data.phaseGroup.sets.nodes[i].slots[0].seed !=null)
            {
                var participant:Participant=
                {
                    bracketID: playerList[bracketIDs.indexOf(data.phaseGroup.sets.nodes[i].slots[0].seed.id)].bracketID,
                    isWinner: false,
                    tag: playerList[bracketIDs.indexOf(data.phaseGroup.sets.nodes[i].slots[0].seed.id)].tag,
                    smashggID: "",
                    rating: 0,
                    projectedPath: [],
                    seed: 0,
                    region: undefined,
                    carpool: undefined
                }

                participant.isWinner=false
                setList[i].participants.push(participant) 
            }
            //if there is a bye
            if(data.phaseGroup.sets.nodes[i].slots[0].seed ==null && data.phaseGroup.sets.nodes[i].slots[0].prereqType=="bye")
            {
                setList[i].participants.push(bye) 
            }


        
           

            if(data.phaseGroup.sets.nodes[i].slots[1].seed !=null)
            {
                var participant:Participant=
                {
                    bracketID: playerList[bracketIDs.indexOf(data.phaseGroup.sets.nodes[i].slots[1].seed.id)].bracketID,
                    isWinner: false,
                    tag: playerList[bracketIDs.indexOf(data.phaseGroup.sets.nodes[i].slots[1].seed.id)].tag,
                    smashggID: "",
                    rating: 0,
                    projectedPath: [],
                    seed: 0,
                    region: undefined,
                    carpool: undefined
                }
                participant.isWinner=false
                setList[i].participants.push(participant)
            }

            //if there is a bye
            if(data.phaseGroup.sets.nodes[i].slots[1].seed ==null && data.phaseGroup.sets.nodes[i].slots[1].prereqType=="bye")
            {
                setList[i].participants.push(bye) 
            }

        }
        


    }


    console.log(setList)
    return setList


}