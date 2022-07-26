import Competitor from "./Competitor";
import axios from 'axios';
import { request } from 'https';
import type { NextApiRequest, NextApiResponse } from 'next'
import urlToSlug from "./urlToSlug";

export default async function getData(slug:string,apiKey:string)
{
    
    console.log("getdata was called with slug:" + slug)
    //this variable is used to access pages beyond the first one for query results(eg.Page:2...etc.)
    var pageCounter=1
    //this will hold all the data from the query results, including those from beyond page 1
    var playerData:any
    //boolean that will be set to false when there's no more data
    var thereIsData=true

     //API call
     while(thereIsData)
     {
        
             if(pageCounter==1)
             {
                
                 await APICall(pageCounter,slug,apiKey).then((value)=>
                 {
                     playerData=value
                     console.log("value:")
                     console.log(value)
                     console.log(value.length)
                     
                 })
                 
             }
             else 
             {
                 //loop to fill up remaining players obtained from beyond page 1 of API call
                 await APICall(pageCounter,slug,apiKey).then((value)=>
                 {
                     
                     if(value.length==0)
                     {
                         thereIsData=false
                     }
                     if(value.length!=0)
                     {
                         
                        for(let i=0;i<value.length;i++)
                         {
                            playerData.push(value[i])
                         }
     
                     }
    
                 })
 
                 
                            
             }//end of else
             pageCounter=pageCounter+1;   
     }
 
     if(thereIsData==false)
     {
         return playerData
     }
     
    
         
 }
    

function APICall(page:number,slug:string,apiKey:string)
{
    //API call
    return axios.get('api/getPlayerInfo',{params:{slug:slug,page:page,apiKey:apiKey}}).then(({data})=>
        {
            console.log("getting info")
            console.log(data.data.event.entrants.nodes)
            return data.data.event.entrants.nodes
        }
    )
}
