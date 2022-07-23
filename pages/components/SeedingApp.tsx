
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
import GenerateBracketButton from "./GenerateBracketButton";
interface props {
    pList: Competitor[];
    cList: Carpool[];
    updateSelectedCarpool: (arg: Carpool) => void;
    addPlayerToCarpool:(player:Competitor)=>void;
}
interface carpoolDisplayProps
{
    pList: Competitor[];
    cList: Carpool[];
}
export default function SeedingApp()
{

    const [url,setURL] = useState("placeholder");
    const [submitStatus,setSubmitStatus]=useState(false);
    const [playerList,setPlayerList]=useState<Competitor[]>([])
    const [carpoolList,setCarpoolList]=useState<Carpool[]>([])
    const [carpoolCount,setCarpoolCount]=useState<number>(0)
    const [selectedPlayer,setSelectedPlayer]=useState<Competitor>()
    const [selectedCarpool,setSelectedCarpool]=useState<Carpool>()


    const updateSelectedCarpool = (carpool: Carpool):void => {
    alert("selected carpool is:"+carpool.carpoolName)
    setSelectedCarpool(carpool)
    }
    const addPlayerToCarpool=(player:Competitor):void=>
    {
        alert("added to carpool: "+selectedCarpool?.carpoolName+": "+player.tag)
        selectedCarpool!.addCarpoolMember(player)
        player.carpool=selectedCarpool!
        setSelectedPlayer(player)
        setCarpoolCount(carpoolList.length)
        
       

    }
    
    const generateBracket=(playerList:Competitor[]):void=>
    {
        //rest of function goes here
        console.log(playerList)
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
        let carpoolAlias="carpool "+carpoolCount.toString()
      
        let tempCarpool=new Carpool(carpoolAlias,[])
        carpoolList.push(tempCarpool)
        setCarpoolCount(carpoolList.length)
        alert("carpool created"+ carpoolList[carpoolList.length-1].carpoolName)
        setCarpoolList(carpoolList)
    }

    
    

   
 

    

      
    

    return(
            <div className={styles.SeedingApp}>
                {submitStatus?
                    <div className={styles.SeedingApp} >
                        <div className={styles.SeedingApp}>
                        <GenerateBracketButton playerList={playerList} generateBracket={generateBracket} />
                        <DisplayParticipantList pList={playerList} cList={carpoolList} updateSelectedCarpool={updateSelectedCarpool} addPlayerToCarpool={addPlayerToCarpool}/>
                        <CarpoolDisplay cList={carpoolList} pList={playerList} setPlayerFromButton={function (player: Competitor): void {
                        
                        } }/>
                        </div>
                        <div className={styles.carpoolButton}>
                            <button className={styles.carpoolButton} onClick={e => { createCarpool(e) }}> create carpool</button> 
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


