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
        const entrants = await getEntrants(params)
        
        res.status(200).json(entrants)
}
interface GetEntrants
{
slug:string
}


// AJAX functions
export const getEntrants = async (params: GetEntrants) => {
  console.log("this is api call with slug: "+ params.slug)
    const graphql = {
        query: `query EventEntrants($eventSlug: String, $perPage: Int!) {
            event(slug:$eventSlug) {
              id
              name
              entrants(query: {
                perPage: $perPage
              }) {
                pageInfo {
                  total
                  totalPages
                }
                nodes {
                  id
                  participants {
                    id
                    gamerTag
                    player
                    {
                      id
                    }
                  }
                }
              }
            }
          }`,
        variables: {
            
            "eventSlug":params.slug,
             "perPage": 500
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
        console.error("failed to get tournaments", error)
        return {}
    }
  }