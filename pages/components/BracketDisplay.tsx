import React, { useState } from "react";
import { Match,Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import getBracketData from "../modules/getBracketData";
import Competitor from "../modules/Competitor";
import getRating from "../modules/getRating";
import setRating from "../modules/setRating";
import generateMatches from "../modules/generateMatches";
import dynamic from "next/dynamic";


interface MatchStructure
{
    upper:Match[],
    lower:Match[]
}


export default function BracketDisplay()
{
  


    const DynamicComponentWithNoSSR = dynamic(
        () => import("../components/BracketModule"),{
            ssr: false,
            
        }

      )

    
    return(
     <DynamicComponentWithNoSSR/>
   )

}


  