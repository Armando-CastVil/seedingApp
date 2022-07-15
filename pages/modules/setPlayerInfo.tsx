import Competitor from "./Competitor";
import setRating from "./setRating";
import sortByRating from "./sortByRating";
import variables from "./variables";
//function that fills an array composed of all the competitors along with the necessary data like id,tag,rating, and bracketid
export async function setPlayerInfo(data:any): Promise<Competitor[]>
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
        let  entry= new Competitor(variables.players[ID],bracketID)
        playerList[i]=entry;
    }

    //sort competitors by rating
    playerList=playerList.sort((entry1,entry2)=>(entry1.player.rating<entry2.player.rating)? 1 :(entry1.player.rating>entry2.player.rating) ?-1:0);
   //set bracketIDs to the sorted list, the bracketID now corresponds to a seed
   for(let i=0;i<playerList.length;i++)
   {
    playerList[i].bracketID=data.phaseGroup.seeds.nodes[i].id
   }
   return playerList;
}//end of setPlayerInfo() function

