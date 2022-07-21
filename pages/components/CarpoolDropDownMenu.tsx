import { useState } from "react";
import Carpool from "../modules/Carpool";

interface props {
    
    cList: Carpool[];
}
export default function CarpoolDropDownMenu({cList}:props)
{
    const [carpool,setCarpool]=useState<Carpool>()
    let selectCarpool = (c:any) => {
        setCarpool(c.target.value)
    }
    return(
        <select onChange={selectCarpool}> 
                 <option value="⬇️ Select a carpool ⬇️"> -- Select a carpool -- </option>
            
                {cList.map((carpool) => <option value={carpool.carpoolName}></option>)}
                </select>
    )
}