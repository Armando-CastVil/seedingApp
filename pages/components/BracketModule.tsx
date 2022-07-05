import { DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import React, { useState } from 'react';
import generateMatches from '../modules/generateMatches';
import getBracketData from '../modules/getBracketData';
import { mikomatchlist } from '../modules/mikotational';
import generateBracketPaths from '../modules/generateBracketPaths';
import getAllSeedingInfo from '../modules/getAllSeedingInfo';


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
            //generateBracketPaths(value)
            console.log(value)
            generateMatches(value).then((value)=>
            {
                setMatchList(value)
                

            })

            //getAllSeedingInfo(value)
            
        })
        
        
        setSubmitStatus(true)
        
    
        
    }
    
  

    return  (
        <div>
        {submitStatus &&matchList!=undefined?
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