//find out their corresponding matches and push them in to them
import { Match, Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "../Competitor";
import { getNextMatch } from "../getNextMatch";



export async function reportResults(data:any,playerList:Competitor[],tempSetList:Match[],setsWithResults:number[])
{
    
    //this array holds the bracket ids of all the players in order of their seeding to
    //make looking them up easier using the indexof method
    var bracketIDs:any=[]
    //also assigns their bracket ID to their corresponding index in the bracketID array
    for(let i=0;i<playerList.length;i++)
    {
        bracketIDs[i]=playerList[i].bracketID
        
    }
  
    let temptempSetList=JSON.parse(JSON.stringify(tempSetList))
    //will go through all the sets that have results filled in
    for(let i=0;i<setsWithResults.length;i++)
    {
        //find out the next match that the players in this set will advance to
        //checks the data obtained from the api, specifically the nodes that contain set info
        for(let j=0;j<data.phaseGroup.sets.nodes.length;j++)
        {
            //check each slot to see if the set with results is a prerequisite
            for(let k=0;k<data.phaseGroup.sets.nodes[j].slots.length;k++)
            {
                //if the current set(tempSetList[i]) is a prerequisite, then this match is the match that follows
                if(tempSetList[setsWithResults[i]].id==data.phaseGroup.sets.nodes[j].slots[k].prereqId)
                {
                
                    //the possible scenarios for a participant are: winners bracket to winners bracket, winners to losers, 
                    //losers to losers, and losers to winners(only in case of losers finals)

                    //if the current set and the next set are in winners
                    if(data.phaseGroup.sets.nodes[setsWithResults[i]].round>0 && data.phaseGroup.sets.nodes[j].round>0)
                    {
                        
                        //assign the next set as this sets next match
                        var nextMatch:any;
                        nextMatch = await getNextMatch(data,data.phaseGroup.sets.nodes[j])
                        tempSetList[setsWithResults[i]].nextMatchId=nextMatch.id
                        
                        //push the winner in to the next set
                        if(tempSetList[setsWithResults[i]].participants[0].isWinner)
                        {
                            
                            //make a copy of the participant but with winner status set to false
                            var tempWinner:Participant=JSON.parse(JSON.stringify(tempSetList[setsWithResults[i]].participants[0]))
                            tempWinner.isWinner=false
                            tempSetList[j].participants.push(tempWinner)
                            
                            
                            
                        }
                        else
                        {
                            
                            //make a copy of the participant but with winner status set to false
                            var tempWinner:Participant=JSON.parse(JSON.stringify(tempSetList[setsWithResults[i]].participants[1]))
                            tempWinner.isWinner=false
                            tempSetList[j].participants.push(tempWinner)
                        
                        
                        }
                        
                        


                    }
                    //if the current set is in winners and the next set is in losers
                    if(data.phaseGroup.sets.nodes[setsWithResults[i]].round>0 && data.phaseGroup.sets.nodes[j].round<0)
                    {
                        
                        //assign the next set as this sets next match
                        var nextMatch:any;
                        nextMatch = await getNextMatch(data,data.phaseGroup.sets.nodes[j])
                        
                        
                        tempSetList[setsWithResults[i]].nextLooserMatchId=nextMatch.id
                        //push the loser in to the next set
                         if(tempSetList[setsWithResults[i]].participants[0].isWinner==false)
                         {
                            
                             for(let c=0;c<tempSetList.length;c++)
                             {

                                 if(tempSetList[c].id==tempSetList[setsWithResults[i]].nextLooserMatchId)
                                 {
                                    
                                    tempSetList[c].participants.push(tempSetList[setsWithResults[i]].participants[0])
                                    break
                                 }
                             }
                           
                         }
                        else
                        {

                            if(tempSetList[setsWithResults[i]].participants[1].isWinner==false)
                            {
                                
                                for(let c=0;c<tempSetList.length;c++)
                                {
   
                                    
                                    if(tempSetList[c].id==tempSetList[setsWithResults[i]].nextLooserMatchId)
                                    {
                                        
                                        tempSetList[c].participants.push(tempSetList[setsWithResults[i]].participants[1])
                                       break
                                    }
                                }
                              
                            }
                           
                        }
                 
                    }
                    //if the current set is in losers and the next set is in losers
                    if(data.phaseGroup.sets.nodes[setsWithResults[i]].round<0 && data.phaseGroup.sets.nodes[j].round<0)
                    {
                        //assign the next set as this sets next match
                        var nextMatch:any;
                        nextMatch = await getNextMatch(data,data.phaseGroup.sets.nodes[j])
                        tempSetList[setsWithResults[i]].nextMatchId=nextMatch.id
                        tempSetList[setsWithResults[i]].nextLooserMatchId=undefined
                        
                        //push the winner in to the next set
                        if(tempSetList[setsWithResults[i]].participants[0].isWinner==true)
                        { 
                            //make a copy of the participant but with winner status set to false
                            var tempWinner:Participant=JSON.parse(JSON.stringify(tempSetList[setsWithResults[i]].participants[0]))
                            tempWinner.isWinner=false
                            nextMatch = await getNextMatch(data,data.phaseGroup.sets.nodes[j])
                            for(let c=0;c<tempSetList.length;c++)
                            {
                                
        
                                if(tempSetList[c].id==nextMatch.id)
                                {
                                    
                                    tempSetList[c].participants.push(tempWinner)
                                    break
                                }
                            }
                          
                        }
                        else
                        {
                            //make a copy of the participant but with winner status set to false
                            var tempWinner:Participant=JSON.parse(JSON.stringify(tempSetList[setsWithResults[i]].participants[1]))
                            tempWinner.isWinner=false
                            nextMatch = await getNextMatch(data,data.phaseGroup.sets.nodes[j])

                            for(let c=0;c<tempSetList.length;c++)
                            {
                                if(tempSetList[c].id==nextMatch.id)
                                {
                                    
                                    
                                    tempSetList[c].participants.push(tempWinner)
                                    break
                                }
                            }
                            
                        }
                    }  
                    

                    //if the current set is in losers and the next set is in winners
                    if(data.phaseGroup.sets.nodes[setsWithResults[i]].round<0 && data.phaseGroup.sets.nodes[j].round>0)
                    {
                        //assign the next set as this sets next match
                        
                        nextMatch = await getNextMatch(data,data.phaseGroup.sets.nodes[j])
                        tempSetList[setsWithResults[i]].nextMatchId=nextMatch.id

                        //push the winner in to the next set
                        if(tempSetList[setsWithResults[i]].participants[0].isWinner==true)
                        {
                            //make a copy of the participant but with winner status set to false
                            var tempWinner:Participant=JSON.parse(JSON.stringify(tempSetList[setsWithResults[i]].participants[0]))
                            tempWinner.isWinner=false
                            tempSetList[j].participants.push(tempWinner)
                            
                        }
                        else
                        {
                            //make a copy of the participant but with winner status set to false
                            var tempWinner:Participant=JSON.parse(JSON.stringify(tempSetList[setsWithResults[i]].participants[1]))
                            tempWinner.isWinner=false
                            tempSetList[j].participants.push(tempWinner)
                            
                        }
                    }
                }
            }          
        }
    }
    return tempSetList
}
