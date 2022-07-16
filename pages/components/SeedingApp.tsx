
import axios from "axios";
import { SetStateAction, useState } from "react";
import urlToSlug from "../modules/urlToSlug";
import DisplayParticipantList from "./DisplayParticipantList";

export default function SeedingApp()
{

    const [phaseGroup,setPhaseGroup]=useState();
    const [url,setURL] = useState("placeholder");
    const [submitStatus,setSubmitStatus]=useState(false);

    const handleSubmit= (event: { preventDefault: () => void; })  => {
        event.preventDefault();
        APICall(urlToSlug(url)!).then((value)=>
        setPhaseGroup(value.data.event.phaseGroups[0].id))
        setSubmitStatus(true)
      
    }

   
 

    

      
    

    return(
        <div>
          {submitStatus?
           phaseGroup==undefined?
           <h3>loading phase...</h3> 
           :<DisplayParticipantList phase={phaseGroup}/>
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