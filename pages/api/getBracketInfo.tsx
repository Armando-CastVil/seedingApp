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
) {
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
        query: `query sets($slug: String!, $seedsPerPage: Int, $seedsPage: Int, $setsPerPage: Int, $setsPage: Int) {
            event(slug: $slug) {
                phaseGroups {
                phase {
                  id
                }
                seeds(query: {
                  perPage: $seedsPerPage
                  page: $seedsPage
                }) {
                  nodes {
                    id
                    progressionSource {
                      id
                    }
                    seedNum
                  }
                }
                progressionsOut {
                  id
                }
                sets(perPage: $setsPerPage, page: $setsPage, filters: {
                  showByes: true
                }) {
                  nodes {
                    id
                    identifier
                    round
                    slots(includeByes: false) {
                      prereqId
                      prereqType
                      seed {
                        id
                      }
                      entrant {
                        participants {
                          player {
                            id
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }`,
        variables: {
            
                "slug": "tournament/miko-s-super-invitational-21st-bday-party-prelocal-before-get/event/super-singles-bracket",
                "setsPage": 1,
                "seedsPage": 1,
                "setsPerPage": 100,
                "seedsPerPage": 100
              
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