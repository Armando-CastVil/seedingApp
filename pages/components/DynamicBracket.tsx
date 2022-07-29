import { DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from "react";
import BracketDisplay from './BracketDisplay';
interface bracketprops
{
    bracketSubmitStatus:boolean;
    matchList:any
}

export default function DynamicBracketModule({bracketSubmitStatus,matchList}:bracketprops)
{
   console.log("dynamic bracket module matchlist:")
   console.log(matchList)

    const DynamicComponentWithNoSSR = dynamic(
        () => import('./BracketDisplay')
      )
    
    return(
      
       
        
        <div>
            <h3>dynamic module:</h3>
            <DynamicComponentWithNoSSR bracketSubmitStatus={bracketSubmitStatus} matchList={matchList} />
        
        </div>
    )
}