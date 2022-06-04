import Competitor from "./Competitor";
import axios from 'axios';
import { request } from 'https';
import type { NextApiRequest, NextApiResponse } from 'next'
import {SMASHGG_API_URL, SMASHGG_API_KEY} from '../utility/config'
import urlToSlug from "./urlToSlug";

export default function getData(slug:string):any
{
    
    console.log("getdata was called with slug:" + slug)
  
  
    //API call
    return axios.get('api/getPlayerInfo',{params:{slug:slug,}}).then(({data})=>
        {
            console.log("getting info")
            return data.data.event.entrants.nodes
        }
    )
  

}

