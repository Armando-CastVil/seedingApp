
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
import GenerateBracketButton from "./UpdateBracketButton";
import assignBracketIds from "../modules/assignBracketIds";
import SetAPI from "./SetAPI";
import pushSeeding from "../modules/pushSeeding";


//seeding app is the top level component 
export default function SeedingApp()
{

    //states are objects that store data. First element is where data is stored and second is the function
    //to set the data
    const [url,setURL] = useState("placeholder");
    const [submitStatus,setSubmitStatus]=useState(false);
    const [playerList,setPlayerList]=useState<Competitor[]>([])
    const [carpoolList,setCarpoolList]=useState<Carpool[]>([])
    const [carpoolCount,setCarpoolCount]=useState<number>(0)
    const [selectedPlayer,setSelectedPlayer]=useState<Competitor>()
    const [selectedCarpool,setSelectedCarpool]=useState<Carpool>()
    const [apiData,setApiData]=useState<any>()
    const [apiKey,setApiKey]=useState<string|undefined>(getApiKey())
    const [errors,setErrors]=useState();


    //this function updates the selected carpool, it is passed down to the drop down list component
    const updateSelectedCarpool = (carpool: Carpool):void => {
    alert("selected carpool is:"+carpool.carpoolName)
    setSelectedCarpool(carpool)
    }

    //this function updates the API key, it is passed down to the setapi component
    const updateApiKey = (apiKey: string):void => {
        setApiKey(apiKey)
    }

    //this function adds a player to a carpool and sets its carpool property to the selected carpool
    const addPlayerToCarpool=(player:Competitor):void=>
    {
        alert("added to carpool: "+selectedCarpool?.carpoolName+": "+player.tag)
        selectedCarpool!.addCarpoolMember(player)
        player.carpool=selectedCarpool!
        setSelectedPlayer(player)
        setCarpoolCount(carpoolList.length)

    }
    
    //to do
    const updateBracket=(playerList:Competitor[]):void=>
    {
        setPlayerList(assignBracketIds(apiData,playerList))    
    }
    
  

    //function called by the submit button. Retrieves bracket data from smashgg
    const handleSubmit= async (event: { preventDefault: () => void; })  => {
        event.preventDefault();
        saveApiKey(apiKey);
        await APICall(urlToSlug(url)!,apiKey!).then((value)=>
        {
            setApiData(value)
            console.log(value.data.event.phaseGroups[0].id)
            getBracketData(value.data.event.phaseGroups[0].id,apiKey!).then((value)=>
            {
                let phaseID = value.phaseGroup.phase.id;
                setPlayerInfoFromPhase(value).then(async (value)=>
                {
                    console.log(value.length+" players");
                    setPlayerList(value)
                    let errors = await pushSeeding(value,phaseID,apiKey!);
                    console.log(errors === undefined);
                    console.log(errors);
                    setErrors(errors);
                    setSubmitStatus(true);
                })
                
            })
        })    
    }

    //function passed called by the create carpool button
    function createCarpool(e:any) {
        let carpoolAlias="carpool "+carpoolCount.toString()
      
        let tempCarpool=new Carpool(carpoolAlias,[])
        carpoolList.push(tempCarpool)
        setCarpoolCount(carpoolList.length)
        alert("carpool created"+ carpoolList[carpoolList.length-1].carpoolName)
        setCarpoolList(carpoolList)
    }

    
    

   
 

    

      
                    // <div className={styles.SeedingApp} >
                    //     <div className={styles.SeedingApp}>
                    //     <GenerateBracketButton playerList={playerList} updateBracket={updateBracket} />
                    //     <DisplayParticipantList pList={playerList} cList={carpoolList} updateSelectedCarpool={updateSelectedCarpool} addPlayerToCarpool={addPlayerToCarpool}/>
                    //     <CarpoolDisplay cList={carpoolList} pList={playerList} setPlayerFromButton={function (player: Competitor): void {
                        
                    //     } }/>
                    //     </div>
                    //     <div className={styles.carpoolButton}>
                    //         <button className={styles.carpoolButton} onClick={e => { createCarpool(e) }}> create carpool</button> 
                    //     </div>
                    // </div>
    
    //return statement
    return(
            <div className={styles.SeedingApp}>
                {submitStatus?
                    errors === undefined?
                        <h1>Tournament seeded!</h1>
                        :
                        <h1>Tournament seeding failed: {errors}</h1>
                    :
                    <>
                        <form onSubmit={e => { handleSubmit(e) }}>
                        <label>
                        API key:
                        <input type="password"  onChange={e => setApiKey(e.target.value)} defaultValue={getApiKey()}/> 
                        </label>
                        <br/>
                        <label>
                        URL:
                        <input type="text"  onChange={e => setURL(e.target.value)}/> 
                        </label>
                        <input type="submit" value="Submit"  />
                        </form>
                    </>
                }
            </div>
        
        
    )
   

}

function getApiKey() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("seedingAppApiKey") || "";
    } else {
        return "";
    }
}

function saveApiKey(apiKey:string|undefined) {
    if (typeof window !== 'undefined') {
        localStorage.setItem("seedingAppApiKey",apiKey || "");
    }
}

function APICall(slug:string,apiKey:string)
{
    //API call
    return axios.get('api/getPhaseGroups',{params:{slug:slug,apiKey:apiKey}}).then(({data})=>
        {
            console.log("getting phaseGroups")
            console.log(data)
            return data
        }
    )
}


