import axios from 'axios';
import { request } from 'https';
import type { NextApiRequest, NextApiResponse } from 'next'
import {SMASHGG_API_URL, SMASHGG_API_KEY} from '../utility/config'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) 
{
        const phaseId = req.query.phaseId as unknown as number;
        const seedMapping = req.query.seedMapping as unknown as [UpdatePhaseSeedInfo];
        const params={phaseId,seedMapping}

        await mutateSeeding(params)
        
        res.status(200)
}
interface MutateSeeding
{
    phaseId: number,
    seedMapping: [UpdatePhaseSeedInfo]
}
export type UpdatePhaseSeedInfo = {
    seedId: number,
    seedNum: number
}


// AJAX functions
export const mutateSeeding = async (params: MutateSeeding) => {
  console.log("mutating seeding of phase: "+ params.phaseId)
    const graphql = {
        query: `mutation thing($phaseId: ID! $seedMapping: [UpdatePhaseSeedInfo]!) {
                updatePhaseSeeding(phaseId: $phaseId, seedMapping: $seedMapping) {
                    id
                }
            }`,
        variables: { 
            "phaseId": params.phaseId,
            "seedMapping": params.seedMapping
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
        console.error("failed to mutate seeding", error)
        return {}
    }
  }