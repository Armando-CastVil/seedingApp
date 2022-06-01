import Competitor from "./Competitor";
import axios from 'axios';
import { request } from 'https';
import type { NextApiRequest, NextApiResponse } from 'next'
import {SMASHGG_API_URL, SMASHGG_API_KEY} from '../utility/config'
import urlToSlug from "./urlToSlug";

export default function getData():any
{
    
    console.log("getdata was called")
    let slug=urlToSlug("https://www.start.gg/tournament/wavedash-2022/event/ultimate-singles");
  
    //API call
    return axios.get('api/getPlayerInfo',{params:{slug:slug,}}).then(({data})=>
        {
            console.log("getting info")
            return data.data.event.entrants.nodes
        }
    )
  

}

