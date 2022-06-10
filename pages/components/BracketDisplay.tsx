import React from "react";
import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { dummymatches } from "./dummymatches";
export default function BracketDisplay()
{
    return(
    
    
    <DoubleEliminationBracket
        matches={dummymatches}
        matchComponent={Match}
     
    />)

}

