import { Match } from "@g-loot/react-tournament-brackets/dist/src/types"
import Competitor from "../Competitor"

//this functions sets the winners for matches that have 2 participants
export default function processResults(setList:Match[],playerList:Competitor[])
{
    //this array holds the indexes of the arrays that have 2 participants
    let setsWithResults:number[]=[]

    //this array holds the bracket ids of all the players in order of their seeding to
    //make looking them up easier using the indexof method
    var bracketIDs:any=[]
    //also assigns their bracket ID to their corresponding index in the bracketID array
    for(let i=0;i<playerList.length;i++)
    {
        bracketIDs[i]=playerList[i].bracketID
        
    }
    
    //find out winner and loser and push them in to their corresponding next matches
    for(let i=0;i<setList.length;i++)
    { 
        //if a set has 2 participants and neither has been set as a winner, meaning match hasn't been processed
        if(setList[i].participants.length==2 && (setList[i].participants[0].isWinner==false)&&(setList[i].participants[1].isWinner==false))
            {
                //store the indexes of sets that have 2 players
                setsWithResults.push(i)
                
                //find out the winner of the set and assign them to their corresponding variable
                if(bracketIDs.indexOf(setList[i].participants[0].bracketID)<bracketIDs.indexOf(setList[i].participants[1].bracketID))
                {  
                    setList[i].participants[0].isWinner=true
                    setList[i].participants[1].isWinner=false
    
                }    
                else
                {
                    setList[i].participants[0].isWinner=false
                    setList[i].participants[1].isWinner=true
                }

                
               
            }
    }
    
    return {setList,
        setsWithResults}
}