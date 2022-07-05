//gets the next match without a bye
export async function getNextNonByeMatch(data:any, nextMatchObject:any)
{

    

    
    var stopFlag=false;

    //if the next match has no byes, then return it
    if(nextMatchObject.slots[0].prereqType!="bye" && nextMatchObject.slots[1].prereqType!="bye")
    {
        

        return nextMatchObject
       
    }
    //if it has a bye, find the next match's next match
    if(nextMatchObject.slots[0].prereqType=="bye"||nextMatchObject.slots[1].prereqType=="bye")
    {
        
        for(let j=0;j<data.phaseGroup.sets.nodes.length;j++)
        {
            //check each slot to see if the set with results is a prerequisite
            for(let k=0;k<data.phaseGroup.sets.nodes[j].slots.length;k++)
            {
                
                //this means that node[j] is its next match
                
                if(nextMatchObject.id==data.phaseGroup.sets.nodes[j].slots[k].prereqId)
                    {   
                        
                        nextMatchObject=data.phaseGroup.sets.nodes[j]
                        stopFlag=true
                        break
                    }
               
                   
                
            }

             
            if(stopFlag)
            {
                break
            }
            
        }

      
        
    
    }

    //if the  new next match also has a bye
    if(nextMatchObject.slots[0].prereqType=="bye"||nextMatchObject.slots[1].prereqType=="bye")
    {
        await getNextNonByeMatch(data,nextMatchObject).then((value)=>
        {
            nextMatchObject=value
        }) 
          
    }
    if(nextMatchObject.slots[0].prereqType!="bye"&&nextMatchObject.slots[1].prereqType!="bye")
    {
    return nextMatchObject
    }
    
}
