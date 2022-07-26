import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import {SMASHGG_API_URL} from '../utility/config'

type Data = {
  name: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) 
{
        const slug = req.query.slug as string
        const apiKey = req.query.apiKey as string
        
        const params={slug,apiKey}

        const data = await GetAdmins(params)
        
        res.status(200).json(data)
}
interface GetAdmins
{
slug:string,
apiKey:string
}


// AJAX functions
export const GetAdmins = async (params: GetAdmins) => {
  console.log("this is api call to get admins with slug: "+ params.slug)
    const graphql = 
    {
        query: 
            `query isAdmin($eventSlug: String!) {
  event(slug: $eventSlug) {
    tournament {
      admins {
        id
      }
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
                'Authorization': `Bearer ${params.apiKey}`
            }
        })
        return res.data;
    } catch(error) {
        console.error("failed to get admins", error)
        return {}
    }
  }