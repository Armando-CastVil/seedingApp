import { DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from "react";
import BracketDisplay from './BracketDisplay';
export default function BracketTest()
{
   

    const DynamicComponentWithNoSSR = dynamic(
        () => import('./BracketDisplay'),
        { ssr: false }
      )
    
    return(
      
       
        
        <div>
            <h3>dynamic module:</h3>
            <DynamicComponentWithNoSSR/>
        
        </div>
    )
}