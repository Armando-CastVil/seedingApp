
import Competitor from "./Competitor";
import getRating from "./getRating";
import setRating from "./setRating";
import sortByRating from "./sortByRating";

interface Participants
{
    
    id: string,
    resultText: null,
    isWinner: boolean,
    status: null,
    name:string
   
}

interface Set
{
   
          id: number,
          name:string
          nextMatchId:number
          nextLooserMatchId: number,
          tournamentRoundText: string,
          startTime: string,
          state: string,
          participants:Participants[]
        
}

interface MatchStructure
{
    upper:[],
    lower:[]
}


export default async function generateMatches(data:any)
{

    //initializing arrays
    var playerList:Competitor[]=[]
    var setList:Set[]=[];
   await setPlayerInfo(data).then((value: Competitor[])=>
    {
        playerList=value
    })
   
    
    





  
    
 

   
}
//function that fills an array composed of all the competitors along with the necessary data like id,tag,rating, and bracketid
async function setPlayerInfo(data:any)
{
    var playerList:Competitor[]=[];
    var ID="";
    var tag="";
    var rating=0;
    var bracketID=0;

    for(let i=0;i<data.event.phaseGroups[0].seeds.nodes.length;i++)
    {

        
        ID=data.event.phaseGroups[0].seeds.nodes[i].players[0].id
        tag=data.event.phaseGroups[0].seeds.nodes[i].players[0].gamerTag
        getRating(ID).then((value:number)=>
        {
            rating=value
        })

        
        let  entry= new Competitor(ID,tag,rating,bracketID)
        playerList[i]=entry;
    }

   await setRating(playerList).then((value)=>{
       playerList=value
    })
    
   playerList= sortByRating(playerList)
   for(let i=0;i<playerList.length;i++)
   {
    playerList[i].bracketID=data.event.phaseGroups[0].seeds.nodes[i].id
   }
   return playerList;
}//end of setPlayerInfo() function

//
function generateSets(data:any,playerList:Competitor[])
{

    var setList:Set[]=[]
    //this loop creates a set and assigns it an ID as long as it isnt an empty set
    for(let i=0;i<data.event.phaseGroups[0].sets.nodes.length;i++)
    {
        
        setList[i]=
        {
            id:data.event.phaseGroups[0].sets.nodes[i].id,
            name:data.event.phaseGroups[0].sets.nodes[i].identifier,
            nextMatchId:0,
            nextLooserMatchId: 0,
            tournamentRoundText: "",
            startTime: "",
            state: 'DONE' ,
            participants:[]

        }
    }
    //for loop to assign next matchID in both winners and losers
    for(let i=0;i<setList.length;i++)
    {
        
        for(let j=0;j<setList.length;j++)
        {
            for(let k=0;k<data.event.phaseGroups[0].sets.nodes[j].slots.length;k++)
            {
                if(setList[i].id==data.event.phaseGroups[0].sets.nodes[j].slots[k].prereqId)
                {
                    if(data.event.phaseGroups[0].sets.nodes[j].round<0)
                    {
                        setList[i].nextLooserMatchId=data.event.phaseGroups[0].sets.nodes[j].slots[k].prereqId
                    }
                    else 
                    {
                        setList[i].nextMatchId=data.event.phaseGroups[0].sets.nodes[j].slots[k].prereqId
                    }

                }
            }
        }
    }
    //end of for loop to assign next match id


    


}

