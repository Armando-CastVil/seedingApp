import React,{useState} from "react";
import urlToSlug from "../modules/urlToSlug";
import getList from "../modules/getList";
import Competitor from "../modules/Competitor";
import axios from "axios";
export default function SetPhaseGroups()
{
    const [url,setURL] = useState("placeholder");
    const [submitStatus,setSubmitStatus]=useState(false);
    const [phaseGroup,setPhaseGroup]=useState();



    const handleSubmit= (event: { preventDefault: () => void; })  => {
        event.preventDefault();
        APICall(urlToSlug(url)!).then((value)=>
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
      
