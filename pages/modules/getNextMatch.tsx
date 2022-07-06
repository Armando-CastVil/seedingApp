//gets the next match regardless of bye
export async function getNextMatch(data:any, nextMatchObject:any)
{
    //go through all the set nodes
    for(let j=0;j<data.phaseGroup.sets.nodes.length;j++)
    {
        //check each slot to see if the set with results is a prerequisite
        for(let k=0;k<data.phaseGroup.sets.nodes[j].slots.length;k++)
            {
                
                //this means that node[j] is its next match
                
                if(nextMatchObject.id==data.phaseGroup.sets.nodes[j].slots[k].prereqId)
                    {   
                        
                        nextMatchObject=data.phaseGroup.sets.nodes[j]
                        break
                    }
               
                   
                
            }

             
           
            
        }

}

