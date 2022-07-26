import { DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import React, { useState } from 'react';
import getBracketData from '../modules/getBracketData';
import useWindowSize from '../Hooks/useWindow';
import seed from '../modules/seed';


interface bracketprops
{
    bracketSubmitStatus:boolean;
    matchList:any
}
export default function Bracket({bracketSubmitStatus,matchList}:bracketprops) {
   

    return  (
        <div>
        {bracketSubmitStatus &&matchList!=undefined?
          <DoubleEliminationBracket
          matches={matchList}
          matchComponent={Match}
          svgWrapper={({ children, ...props }) => (
              <SVGViewer width={1000} height={1000} {...props}>
                {children}
              </SVGViewer>
            )}
        />
        :<h3>readying bracket...</h3>
        }
    </div>
    )
    
    
    
    
  
  }