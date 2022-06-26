import axios from 'axios';


export default async function getBracketData()
{
    //this variable is used to access pages beyond the first one for query results(eg. setsPage:2...etc.)
    var pageCounter=1
    //this will hold all the data from the query results, including those from beyond page 1
    var bracketData:any
    var phaseGroup=1780824
    var thereIsData=true
   
    
    //API call
    while(thereIsData)
    {
       
            if(pageCounter==1)
            {
               
                await APICall(phaseGroup,pageCounter).then((value)=>
                {
                    bracketData=value
                    
                })
                
            }
            else 
            {
                //loop to fill up remaining seeds obtained from beyond page 1 of API call
                await APICall(phaseGroup,pageCounter).then((value)=>
                {
                    
                    if(value.phaseGroup.sets.nodes.length==0)
                    {
                        thereIsData=false
                    }
                    if(value.phaseGroup.seeds.nodes.length!=0)
                    {
                        
                       for(let i=0;i<value.phaseGroup.seeds.nodes.length;i++)
                        {
                        bracketData.phaseGroup.seeds.nodes.push(value.phaseGroup.seeds.nodes[i])
                        }
                        
    
                    }

                      //loop to fill up remaining sets obtained from beyond page 1 of API call
                    if(value.phaseGroup.sets.nodes.length!=0)
                    {
                        
                       for(let i=0;i<value.phaseGroup.sets.nodes.length;i++)
                        {
                    
                        bracketData.phaseGroup.sets.nodes.push(value.phaseGroup.sets.nodes[i])
                        }
                        
                     }    

                    

                })

                
                           
            }//end of else
            pageCounter=pageCounter+1;   
    }

    if(thereIsData==false)
    {
        return bracketData
    }
    
   
        
}
    

function APICall(phaseGroup:number,pageCounter:number)
{
 return axios.get('api/getBracketInfo',{params:{phaseGroup:phaseGroup,seedsPage:pageCounter,setsPage:pageCounter}}).then(({data})=>
 {
     if(data.data.phaseGroup!=undefined)
     {
     return data.data
     }
     else
     {
         return 0
     }
 })
}

