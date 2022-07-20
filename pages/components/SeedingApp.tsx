
import axios from "axios";
import { SetStateAction, useState } from "react";
import Carpool from "../modules/Carpool";
import Competitor from "../modules/Competitor";
import getBracketData from "../modules/getBracketData";
import { setPlayerInfoFromPhase } from "../modules/setPlayerInfoFromPhase";
import urlToSlug from "../modules/urlToSlug";
import styles from '/styles/Home.module.css'
import DisplayParticipantList from "./DisplayParticipantList";
import CarpoolDisplay from "./CarpoolDisplay";
interface props {
    pList: Competitor[];
    cList: Carpool[];
}
export default function SeedingApp()
{

    const [url,setURL] = useState("placeholder");
    const [submitStatus,setSubmitStatus]=useState(false);
    const [playerList,setPlayerList]=useState<Competitor[]>([])
    const [carpoolList,setCarpoolList]=useState<Carpool[]>([])
    
    const props:props = {
        pList:playerList,
        cList:carpoolList
    }


    const handleSubmit= async (event: { preventDefault: () => void; })  => {
        event.preventDefault();
        await APICall(urlToSlug(url)!).then((value)=>
        {
            
            console.log(value.data.event.phaseGroups[0].id)
            getBracketData(value.data.event.phaseGroups[0].id).then((value)=>
        {
    
            setPlayerInfoFromPhase(value).then((value)=>
            {
                setPlayerList(value)
            })
            
            
        })
            setSubmitStatus(true)
        })
        
        /**/
        
        
        
    }
    function createCarpool(e:any) {
        let carpoolAlias="carpool "+carpoolList.length.toString()
        carpoolList.push(new Carpool(carpoolAlias,[playerList[1],playerList[2],playerList[3]]))
        console.log("create carpool reached")
        console.log(carpoolList.length)
        setCarpoolList(carpoolList)
    }
    

   
 

    

      
    

    return(
            <div className={styles.SeedingApp}>
                {submitStatus?
                    <div className={styles.SeedingApp} >
                        <div className={styles.SeedingApp}>
                        <DisplayParticipantList pList={playerList} cList={carpoolList}/>
                        <CarpoolDisplay carpools={carpoolList}/>
                        </div>
                        <div className={styles.carpoolButton}>
                            <button onClick={e => { createCarpool(e) }}> create carpool</button> 
                        </div>
                    </div>
                    :<form onSubmit={e => { handleSubmit(e) }}>
                    <label>
                     URL:
                    <input type="text"  onChange={e => setURL(e.target.value)}/> 
                    </label>
                    <input type="submit" value="Submit"  />
                    </form>
                }
            </div>
        
        
    )
   

}

function APICall(slug:string)
{
    //API call
    return axios.get('api/getPhaseGroups',{params:{slug:slug}}).then(({data})=>
        {
            console.log("getting phaseGroups")
            return data
        }
    )
}


