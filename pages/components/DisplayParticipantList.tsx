import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import Carpool from "../modules/Carpool";
import Competitor from "../modules/Competitor";
import getAllSeedingInfo from "../modules/getAllSeedingInfo";
import getBracketData from "../modules/getBracketData";
import { setPlayerInfoFromPhase } from "../modules/setPlayerInfoFromPhase";
import urlToSlug from "../modules/urlToSlug";
import AddToCarpoolButton from "./AddToCarpoolButton";
import CarpoolDropDownMenu from "./carpoolDropDownMenu";
import styles from '/styles/Home.module.css'
interface props {
    pList: Competitor[];
    cList: Carpool[];
    updateSelectedCarpool: (arg: Carpool) => void
}

interface CarpoolDropDownMenuProps {
    cList: Carpool[],
    updateSelectedCarpool: (arg: Carpool) => void
}
interface buttonProps
{
    player:Competitor;

}

export default function DisplayParticipantList({pList,cList,updateSelectedCarpool}:props)
{


    const [carpool,setCarpool]=useState<Carpool>()
    const [player,setPlayer]=useState<Competitor>()
    const [selectedCarpool, setSelectedCarpool] = useState<Carpool>()
    const handleCarpool= (event: { preventDefault: () => void; })  => {
        carpool?.carpoolMembers.push(player!)
      
    }


    
    useEffect(() => {
    setSelectedCarpool(carpool)
    },[carpool])

    return(
        <div >
          {
          
            pList.map((e:Competitor)=>
             <>
             <div className={styles.playerList} key={e.smashggID.toString() }>
               <h3>{pList.indexOf(e)+1}</h3>
                 <h3>Tag: {e.tag}</h3>
                 <h3>Rating: {e.rating.toFixed(2)}</h3>
                 <CarpoolDropDownMenu cList={cList} updateSelectedCarpool={updateSelectedCarpool}/>
                 <AddToCarpoolButton player={e}/>

             </div>
             <br></br>
             </>
             )
   
          }
          
            
        </div>
    )
        
}
