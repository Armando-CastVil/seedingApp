import React, { useState } from "react";
import { Match,Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import dynamic from "next/dynamic";


interface MatchStructure
{
    upper:Match[],
    lower:Match[]
}

interface bracketprops
{
    bracketSubmitStatus:boolean;
    matchList:any
}
export default function BracketDisplay({bracketSubmitStatus,matchList}:bracketprops)
{
  


    const DynamicComponentWithNoSSR = dynamic(
        () => import("../components/BracketModule"),{
            ssr: false,
            
        }

      )

    
    return(
     <DynamicComponentWithNoSSR bracketSubmitStatus={bracketSubmitStatus} matchList={matchList}  />
   )

}


  