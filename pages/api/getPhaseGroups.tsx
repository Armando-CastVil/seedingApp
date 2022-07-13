import axios from 'axios';
import { request } from 'https';
import type { NextApiRequest, NextApiResponse } from 'next'
import {SMASHGG_API_URL, SMASHGG_API_KEY} from '../utility/config'

type Data = {
  name: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) 
{
        const slug = req.query.slug as string
        
        const params={slug}

        const entrants = await GetPhaseGroups(params)
        
        res.status(200).json(entrants)
}
interface GetPhaseGroups
{
slug:string
}


// AJAX functions
export const GetPhaseGroups = async (params: GetPhaseGroups) => {
  console.log("this is api call to get phaseGroups with slug: "+ params.slug)
    const graphql = 
    {
        query: 
            `query EventEntrants($eventSlug: String) 
            {
                event(slug:$eventSlug) 
                {
                    id
                    name
                    phaseGroups 
                    {
                        id
                    }
                }
            }`,
        variables: 
        { 
            "eventSlug":params.slug,     
        }
    }
    
    
    try {
        const res = await axios.post(SMASHGG_API_URL, JSON.stringify(graphql), {
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${SMASHGG_API_KEY}`
            }
        })
        return res.data;
    } catch(error) {
        console.error("failed to get tournament", error)
        return {}
    }
  }