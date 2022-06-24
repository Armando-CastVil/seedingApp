import { DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import React, { useState } from 'react';
import generateMatches from '../modules/generateMatches';
import getBracketData from '../modules/getBracketData';


export default function Bracket() {
    const [bracketData,setBracketData]=useState<any>();
    const [submitStatus,setSubmitStatus]=useState(false);
    const [matchList,setMatchList]=useState<any>();

    const handleSubmit=  async (event: { preventDefault: () => void; })  => {
        event.preventDefault();    
        getBracketData("").then((value:any)=>
        setBracketData(value))
        setSubmitStatus(true)
        
        
    }

    if(submitStatus&&bracketData!=undefined)
    {
        
       generateMatches(bracketData).then((value)=>
       {
           setMatchList(value)
       })
        
    }

    return  (
        <div>
        {submitStatus&&matchList!=undefined?
          <DoubleEliminationBracket
          matches={matchList}
          matchComponent={Match}
          svgWrapper={({ children, ...props }) => (
              <SVGViewer width={window.innerWidth} height={window.innerHeight} {...props}>
                {children}
              </SVGViewer>
            )}
        />
        :<button onClick={e => { handleSubmit(e) }}> GET DATA</button> 
        }
    </div>
    )
    
    
    
    
  
  }