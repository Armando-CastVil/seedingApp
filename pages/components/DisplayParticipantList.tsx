import axios from "axios";
import { SetStateAction, useState } from "react";
import Carpool from "../modules/Carpool";
import Competitor from "../modules/Competitor";
import getAllSeedingInfo from "../modules/getAllSeedingInfo";
import getBracketData from "../modules/getBracketData";
import { setPlayerInfoFromPhase } from "../modules/setPlayerInfoFromPhase";
import urlToSlug from "../modules/urlToSlug";
import styles from '/styles/Home.module.css'

export default function DisplayParticipantList({playerList}:any)
{


    const handleCarpool= (event: { preventDefault: () => void; })  => {

      
    }
        

    return(
        <div >
          {
          
            playerList.map((e:Competitor)=>
             <>
             <div className={styles.playerList} key={e.smashggID.toString() }>
               <h3>{playerList.indexOf(e)+1}</h3>
                 <h3>Tag: {e.tag}</h3>
                 <h3>Rating: {e.rating.toFixed(2)}</h3>
                 <button onClick={e => { handleCarpool(e) }}> add to carpool</button> 

             </div>
             <br></br>
             </>
             )
   
          }
          
            
        </div>
    )
        
}
