import React,{useState} from "react";
import urlToSlug from "../modules/urlToSlug";
import getList from "../modules/getList";
import Competitor from "../modules/Competitor";
import fillByes from "../modules/fillByes";
export default function GetListFromURL()
{
    const [url,setURL] = useState("placeholder");
    const [submitStatus,setSubmitStatus]=useState(false);
    const [list,setList]=useState<Competitor[]>([]);



    const handleSubmit= (event: { preventDefault: () => void; })  => {
        event.preventDefault();
        getList(urlToSlug(url)!).then((value)=>
        setList(value))
        setSubmitStatus(true)
    }

    

    

    return (
        <div>
          {submitStatus?
            list.length==0?
            <h3>loading...</h3>
            :list.map((e:Competitor)=>
            <>
            <div key={e.ID.toString()}>
                <h3>Tag: {e.tag}</h3>
                <h3>Rating: {e.rating.toFixed(2)}</h3>
            </div>
            <br></br>
            </>
            )
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
      
