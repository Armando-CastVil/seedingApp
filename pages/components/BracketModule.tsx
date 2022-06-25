import { DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import React, { useState } from 'react';
import generateMatches from '../modules/generateMatches';
import getBracketData from '../modules/getBracketData';
import { mikomatchlist } from '../modules/mikotational';


export default function Bracket() {
    const [bracketData,setBracketData]=useState<any>();
    const [submitStatus,setSubmitStatus]=useState(false);
    const [matchList,setMatchList]=useState<any>();

    const handleSubmit=  async (event: { preventDefault: () => void; })  => {
        event.preventDefault();    
       /* getBracketData("").then((value:any)=>
        setBracketData(value)).then(generateMatches(bracketData).then((value)=>
        {
            setMatchList(value)
        }))*/
        
        getBracketData().then((value)=>
        {
            setBracketData(value)
            console.log(value)
            generateMatches(value)
            
        })
        
        
        setSubmitStatus(true)
    
        
    }

   

    return  (
        <div>
        {submitStatus?
          <DoubleEliminationBracket
          matches={mikomatchlist}
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