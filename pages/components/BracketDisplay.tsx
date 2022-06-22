import React, { useState } from "react";
import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { dummymatches } from "./dummymatches";
import getBracketData from "../modules/getBracketData";
import Competitor from "../modules/Competitor";
import getRating from "../modules/getRating";
import setRating from "../modules/setRating";
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
        setPlayerInfo(bracketData).then((value)=>
        {
            playerList=value
            console.log(playerList.length)
        })

        
    }
    
    
    
    return(
<button onClick={e => { handleSubmit(e) }}> GET DATA</button> 
  
   )

}

async function setPlayerInfo(data:any)
{
    var playerList:Competitor[]=[];
    var ID="";
    var tag="";
    var rating=0;
    var bracketID=0;

    for(let i=0;i<data.event.phaseGroups[0].seeds.nodes.length;i++)
    {

        bracketID=data.event.phaseGroups[0].seeds.nodes[i].id
        ID=data.event.phaseGroups[0].seeds.nodes[i].players[0].id
        tag=data.event.phaseGroups[0].seeds.nodes[i].players[0].gamerTag
        getRating(ID).then((value:number)=>
        {
            rating=value
        })

        
        let  entry= new Competitor(ID,tag,rating,bracketID)
        playerList[i]=entry;
    }

   await setRating(playerList).then((value)=>{
       playerList=value
    })
    return playerList

    
}

//console.log(`tag is ${entry.tag} regular id is ${entry.ID} ranking is ${entry.rating} and bracketid is ${entry.bracketID}`)