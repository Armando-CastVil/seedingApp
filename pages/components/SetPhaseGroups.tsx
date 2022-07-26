import React,{useState} from "react";
import urlToSlug from "../modules/urlToSlug";
import getList from "../modules/getList";
import Competitor from "../modules/Competitor";
import axios from "axios";
interface phaseProps {
  setPhase: (phase: any) => void;

}

export default function SetPhaseGroups(setPhase: (phase: any) => void, apiKey:string)
{
    const [url,setURL] = useState("placeholder");
    const [submitStatus,setSubmitStatus]=useState(false);
    const [phaseGroup,setPhaseGroup]=useState();



    const handleSubmit= (event: { preventDefault: () => void; })  => {
        event.preventDefault();
        APICall(urlToSlug(url)!,apiKey).then((value)=>
        setPhaseGroup(value.data.event.phaseGroups[0].id))
        setSubmitStatus(true)
      
    }

    

    

    return (
        <div>
          {submitStatus?
            <h3>{phaseGroup}</h3>
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

function APICall(slug:string,apiKey:string)
{
    //API call
    return axios.get('api/getPhaseGroups',{params:{slug:slug,apiKey:apiKey}}).then(({data})=>
        {
            console.log("getting phaseGroups")
            return data
        }
    )
}
      
