import { DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import React, { useState } from 'react';
import getBracketData from '../modules/getBracketData';
import getAllSeedingInfo from '../modules/getAllSeedingInfo';
import useWindowSize from '../Hooks/useWindow';


export default function Bracket(apiKey:string) {
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
        
        getBracketData(1,apiKey).then((value)=>
        {
            setBracketData(value)
            //generateBracketPaths(value)
            console.log(value)
            /*generateMatches(value).then((value)=>
            {
                setMatchList(value)
                

            })*/

            getAllSeedingInfo(value).then((matches)=>
            {
                setMatchList(matches)
            })
            
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
              <SVGViewer width={1000} height={1000} {...props}>
                {children}
              </SVGViewer>
            )}
        />
        :<button onClick={e => { handleSubmit(e) }}> GET DATA</button> 
        }
    </div>
    )
    
    
    
    
  
  }