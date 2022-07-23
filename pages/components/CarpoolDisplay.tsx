import axios from "axios";
import { SetStateAction, useState } from "react";
import Carpool from "../modules/Carpool";
import Competitor from "../modules/Competitor";
import getAllSeedingInfo from "../modules/getAllSeedingInfo";
import getBracketData from "../modules/getBracketData";
import { setPlayerInfoFromPhase } from "../modules/setPlayerInfoFromPhase";
import urlToSlug from "../modules/urlToSlug";
import styles from '/styles/Home.module.css'
interface props {
    pList: Competitor[];
    cList: Carpool[];
    setPlayerFromButton: (player: Competitor) => void;
}

export default function CarpoolDisplay({pList,cList,setPlayerFromButton}:props)
{
    console.log("carpool display reached")
    console.log(cList.length+" carpools")
    return(
        <div className={styles.CarpoolDisplay}>
            <h3>carpools:</h3>
            { cList.map((c:Carpool)=>
             <>
             <div  key={c.carpoolName}>
               <h3>{c.carpoolName}</h3>
                {c.carpoolMembers.map((p:Competitor)=>
                <div>
                    <h2>{p.tag}</h2>
                </div>
                )
                }
             </div>
             <br></br>
             </>
            )
            }
        </div>
    )
}
