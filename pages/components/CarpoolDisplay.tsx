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
    
    carpools: Carpool[];
}

export default function CarpoolDisplay({carpools}:props)
{
    console.log("carpool display reached")
    console.log(carpools.length+" carpools")
    return(
        <div>
            { carpools.map((c:Carpool)=>
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
