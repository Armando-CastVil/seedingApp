import axios from 'axios';
import { mutateSeeding, UpdatePhaseSeedInfo } from '../api/mutateSeeding';
import Competitor from './Competitor';

export default async function pushSeeding(competitorSeeding:Competitor[], phaseId: number, apiKey: string)
{
    let seedMapping:UpdatePhaseSeedInfo[] = [];
    for(let i = 0; i<competitorSeeding.length; i++) {
        seedMapping.push({
            seedNum:i+1,
            seedId: competitorSeeding[i].seedID
        })
    }
    let errors = await APICall(phaseId, seedMapping, apiKey);
    console.log(errors);
    return errors;
 }
    

async function APICall(phaseId: number, seedMapping: UpdatePhaseSeedInfo[], apiKey: string)
{
    //API call
    // return axios.get('api/mutateSeeding',{params:{phaseId: phaseId, seedMapping: seedMapping, apiKey: apiKey}}).then(({data})=>
    //     {
    //         console.log("mutating seeding")
    //         console.log(data.data)
    //     }
    // )
    return (await mutateSeeding({phaseId:phaseId, seedMapping: seedMapping, apiKey: apiKey})).errors;
}
