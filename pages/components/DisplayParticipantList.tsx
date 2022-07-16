import axios from "axios";
import { SetStateAction, useState } from "react";
import Competitor from "../modules/Competitor";
import getAllSeedingInfo from "../modules/getAllSeedingInfo";
import getBracketData from "../modules/getBracketData";
import urlToSlug from "../modules/urlToSlug";
export default function DisplayParticipantList({phase}:any)
{

    
    const [bracketData,setBracketData]=useState<any>();
    const [matchList,setMatchList]=useState<any>();
    const [playerList,setPlayerList]=useState<Competitor[]>([])
    const [submitStatus,setSubmitStatus]=useState(false)
    
    

    const handleSubmit= (event: { preventDefault: () => void; })  => {
        getBracketData(phase).then((value)=>
        {
            console.log(value)
            setBracketData(value)
            getAllSeedingInfo(value).then((seedingData)=>
            {
                //setMatchList(seedingData.matchList)
                //console.log("sd: "+seedingData)
                setPlayerList(seedingData)
            })
            
        })
        setSubmitStatus(true)
    }
        


       
    
   



   
 

    

      
    

    return(
        <div>
          {
          
          submitStatus?
          
            playerList.map((e:Competitor)=>
             <>
             <div key={e.ID.toString()}>
               <h3>{playerList.indexOf(e)+1}</h3>
                 <h3>Tag: {e.tag}</h3>
                 <h3>Rating: {e.rating.toFixed(2)}</h3>
             </div>
             <br></br>
             </>
             )
             :<button onClick={e => { handleSubmit(e) }}> display entrants</button> 
          }
          
            
        </div>
    )
        
}
