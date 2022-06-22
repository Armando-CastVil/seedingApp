
import Competitor from "./Competitor";
interface Participants
{
    
    id: string,
    resultText: null,
    isWinner: boolean,
    status: null,
    name:string
   
}
interface Bracket {
    players:Competitor[];
    round: number;
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

var matchArray:MatchStructure=
{
    upper:[],
    lower:[]
}

export default function generateMatches(list:Competitor[])
{

  
    
    var winnersBracket:Bracket=
    {
        players:list,
        round:1
    }

    var losersBracket:Bracket=
    {
        players:[],
        round:1
    }

   
}

function processWinners(winnersArray:Competitor[])
{


}