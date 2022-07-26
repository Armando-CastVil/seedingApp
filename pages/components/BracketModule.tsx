import { DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import React, { useState } from 'react';
import getBracketData from '../modules/getBracketData';
import useWindowSize from '../Hooks/useWindow';
import seed from '../modules/seed';


export default function Bracket() {
    const [bracketData,setBracketData]=useState<any>();
    const [submitStatus,setSubmitStatus]=useState(false);
    const [matchList,setMatchList]=useState<any>();


    
       
    
  

    return  (
        <div>
        {matchList!=undefined?
          <DoubleEliminationBracket
          matches={matchList}
          matchComponent={Match}
          svgWrapper={({ children, ...props }) => (
              <SVGViewer width={1000} height={1000} {...props}>
                {children}
              </SVGViewer>
            )}
        />
        :<h3>loading...</h3> 
        }
    </div>
    )
    
    
    
    
  
  }