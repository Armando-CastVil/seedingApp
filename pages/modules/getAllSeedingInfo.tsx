import { Match,Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "./Competitor";
import { fillInitialBracket } from "./fillInitialBracket";
import { setPlayerInfo } from "./setPlayerInfo";
import setRating from "./setRating";
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
    //set data to each player, list is already sorted by rating
    playerList=await setPlayerInfo(data)
    console.log(playerList)
    
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
    await fillInitialBracket(data,playerList,bracketIDs).then((value)=>
        {
            setList=value
        }
   )
    

}


