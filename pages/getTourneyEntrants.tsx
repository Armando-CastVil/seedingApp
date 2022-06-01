import axios from "axios";
import React, {useState} from "react";
import urlToSlug from "./modules/urlToSlug";




export default function getTourneyEntrants(props:any)
{
const [player,setPlayers]=useState<any>([])

let slug=urlToSlug(props.value);

//API call
const handleSubmit = () => {
    console.log("calling api with slug: "+ slug)
axios.get('api/getPlayerInfo',{params:{slug:props.value,}}).then(({data})=>
    
    setPlayers(data.data.event.entrants.nodes)
);
}

if(slug!="")
{
    handleSubmit();
    slug=""
}


return(
    <div>
   
    <ol>
        {player.map((p:any)=>(
            <li key={p.id}>Player ID:{p.participants[0].player.id} Player Tag: {p.participants[0].gamerTag} </li>
        ))}
    </ol>
</div>

) ; 

}