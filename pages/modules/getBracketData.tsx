import Competitor from "./Competitor";
import axios from 'axios';
import { request } from 'https';
import type { NextApiRequest, NextApiResponse } from 'next'
import {SMASHGG_API_URL, SMASHGG_API_KEY} from '../utility/config'
import urlToSlug from "./urlToSlug";

export default function getBracketData(slug:string):any
{
    
    
    
    //API call
    return axios.get('api/getBracketInfo',{params:{slug:slug,}}).then(({data})=>
        {
            console.log(data.data)
            return data.data
        }
    )
  

}

