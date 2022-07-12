import { DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import React, { useState } from 'react';
import getBracketData from '../modules/getBracketData';
import getAllSeedingInfo from '../modules/getAllSeedingInfo';
import useWindowSize from '../Hooks/useWindow';
import GetListFromURL from './GetListFromURL';


export default function Bracket() {
    const [bracketData,setBracketData]=useState<any>();
    const [submitStatus,setSubmitStatus]=useState(false);
    const [matchList,setMatchList]=useState<any>();

    const [width, height] = useWindowSize();
    const finalWidth = Math.max(width - 50, 500);
    const finalHeight = Math.max(height - 100, 500);

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
              <SVGViewer width={finalWidth} height={finalHeight} {...props}>
                {children}
              </SVGViewer>
            )}
        />
        :<><button onClick={e => { handleSubmit(e); } }> GET DATA</button><GetListFromURL /></>
        }
    </div>
    )
    
    
    
    
  
  }