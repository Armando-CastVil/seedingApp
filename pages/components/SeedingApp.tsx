
import axios from "axios";
import { SetStateAction, useState } from "react";
import Competitor from "../modules/Competitor";
import getBracketData from "../modules/getBracketData";
import { setPlayerInfoFromPhase } from "../modules/setPlayerInfoFromPhase";
import urlToSlug from "../modules/urlToSlug";
import DisplayParticipantList from "./DisplayParticipantList";

export default function SeedingApp()
{

    const [phaseGroup,setPhaseGroup]=useState();
    const [url,setURL] = useState("placeholder");
    const [submitStatus,setSubmitStatus]=useState(false);
    const [playerList,setPlayerList]=useState<Competitor[]>([])

    const handleSubmit= async (event: { preventDefault: () => void; })  => {
        event.preventDefault();
        await APICall(urlToSlug(url)!).then((value)=>
        {
            
            console.log(value.data.event.phaseGroups[0].id)
            getBracketData(value.data.event.phaseGroups[0].id).then((value)=>
        {
    
            setPlayerInfoFromPhase(value).then((value)=>
            {
                setPlayerList(value)
            })
            
            
        })
            setSubmitStatus(true)
        })
        
        /**/
        
        
        
    }
    

   
 

    

      
    

    return(
        <div>
          {submitStatus?
            <DisplayParticipantList playerList={playerList}/>
            :<form onSubmit={e => { handleSubmit(e) }}>
            <label>
              URL:
              <input type="text"  onChange={e => setURL(e.target.value)}/> 
            </label>
            <input type="submit" value="Submit"  />
            </form>
        }
        </div>
        
        
    )
   

}

function APICall(slug:string)
{
    //API call
    return axios.get('api/getPhaseGroups',{params:{slug:slug}}).then(({data})=>
        {
            console.log("getting phaseGroups")
            return data
        }
    )
}