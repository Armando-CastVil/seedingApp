import React from "react";
import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { dummymatches } from "./dummymatches";
export default function BracketDisplay()
{

    const handleClick= (event: { preventDefault: () => void; })  => {
        event.preventDefault();
        
    }
    return(
    
        <div>
<button onClick={e => { handleClick(e) }}></button>
        <DoubleEliminationBracket
        matches={dummymatches}
        matchComponent={Match}
     
    />
        </div>
        
        
  
   )

}

