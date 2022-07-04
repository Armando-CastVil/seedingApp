import { Match,Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "./Competitor";
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

    

}

//function that fills an array composed of all the competitors along with the necessary data like id,tag,rating, and bracketid
async function setPlayerInfo(data:any)
{
    //initialize variables
    var playerList:Competitor[]=[];
    var ID="";
    var tag="";
    var bracketID=0;

    //obtains the attributes from the data obtained from the API call and assigns them
    //to the corresponding variable  
    for(let i=0;i<data.phaseGroup.seeds.nodes.length;i++)
    {
        //obtained from api  
        ID=data.phaseGroup.seeds.nodes[i].players[0].id
        tag=data.phaseGroup.seeds.nodes[i].players[0].gamerTag
        bracketID=0;

        //initialize a Competitor object and push it in to the array
        let  entry= new Competitor(ID,tag,0,bracketID,0)
        playerList[i]=entry;
    }

    //assign ratings to each player obtained from the database
    const ratedList=await setRating(playerList)
    //sort by player
    playerList=sortByRating(ratedList)
   //set bracketIDs to the sorted list, the bracketID now corresponds to a seed
   for(let i=0;i<playerList.length;i++)
   {
    playerList[i].bracketID=data.phaseGroup.seeds.nodes[i].id
    playerList[i].setSeed(i+1);
   }
   return playerList;
}//end of setPlayerInfo() function