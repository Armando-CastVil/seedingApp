import axios from "axios";
import { SetStateAction, useState } from "react";
import Carpool from "../modules/Carpool";
import Competitor from "../modules/Competitor";
import getAllSeedingInfo from "../modules/getAllSeedingInfo";
import getBracketData from "../modules/getBracketData";
import { setPlayerInfoFromPhase } from "../modules/setPlayerInfoFromPhase";
import urlToSlug from "../modules/urlToSlug";
import AddToCarpoolButton from "./AddToCarpoolButton";
import styles from '/styles/Home.module.css'
interface props {
    pList: Competitor[];
    cList: Carpool[];
}

export default function DisplayParticipantList({pList,cList}:props)
{


    const [carpool,setCarpool]=useState<Carpool>()
    const [player,setPlayer]=useState<Competitor>()
    const handleCarpool= (event: { preventDefault: () => void; })  => {
        carpool?.carpoolMembers.push(player!)
      
    }

    let selectCarpool = (c:any) => {
        setCarpool(c.target.value)
      }
        

    return(
        <div >
          {
          
            pList.map((e:Competitor)=>
             <>
             <div className={styles.playerList} key={e.smashggID.toString() }>
               <h3>{pList.indexOf(e)+1}</h3>
                 <h3>Tag: {e.tag}</h3>
                 <h3>Rating: {e.rating.toFixed(2)}</h3>
                 <select onChange={selectCarpool}> 
                 <option value="⬇️ Select a carpool ⬇️"> -- Select a carpool -- </option>
            
                {cList.map((carpool) => <option value={carpool.carpoolName}></option>)}
                </select>
                 <AddToCarpoolButton/>

             </div>
             <br></br>
             </>
             )
   
          }
          
            
        </div>
    )
        
}
