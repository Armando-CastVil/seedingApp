import axios from 'axios';
import { UpdatePhaseSeedInfo } from '../api/mutateSeeding';
import Competitor from './Competitor';

export default async function pushSeeding(competitorSeeding:Competitor[], phaseId: number)
{
    let seedMapping:UpdatePhaseSeedInfo[] = [];
    for(let i = 0; i<competitorSeeding.length; i++) {
        seedMapping.push({
            seedNum:i+1,
            seedId: competitorSeeding[i].entrantId
        })
    }
    APICall(phaseId, seedMapping);
 }
    

function APICall(phaseId: number, seedMapping: UpdatePhaseSeedInfo[])
{
    //API call
    return axios.get('api/mutateSeeding',{params:{phaseId: phaseId, seedMapping: seedMapping}}).then(({data})=>
        {
            console.log("mutating seeding")
            console.log(data.data)
        }
    )
}
