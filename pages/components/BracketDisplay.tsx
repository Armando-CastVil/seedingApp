import React, { useState } from "react";
import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { dummymatches } from "./dummymatches";
import getBracketData from "../modules/getBracketData";
import Competitor from "../modules/Competitor";
import getRating from "../modules/getRating";
import setRating from "../modules/setRating";
import generateMatches from "../modules/generateMatches";
export default function BracketDisplay()
{
    const [bracketData,setBracketData]=useState<any>();
    const [submitStatus,setSubmitStatus]=useState(false);
    var playerList:Competitor[]=[];

    

    const handleSubmit=  async (event: { preventDefault: () => void; })  => {
        event.preventDefault();    
        getBracketData("").then((value:any)=>
        setBracketData(value))
        setSubmitStatus(true)
        
    }
    
    if(submitStatus&&bracketData!=undefined)
    {
        generateMatches(bracketData)
        
    }
    
    
    
    return(
<button onClick={e => { handleSubmit(e) }}> GET DATA</button> 
  
   )

}


  