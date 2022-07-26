
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
import seed from "../modules/seed";
import { Match } from "@g-loot/react-tournament-brackets/dist/src/types";
import Bracket from "./BracketModule"
import  DynamicBracketModule from "./DynamicBracket"
//interface for the list of matches we will pass to the bracket display component
interface MatchStructure
{
    upper:Match[],
    lower:Match[]
}


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
    const [apiKey,setApiKey]=useState<string|undefined>()
    const [matchList,setMatchList]=useState<MatchStructure>()
    const [BracketsubmitStatus,setBracketSubmitStatus]=useState(false);


    //this function updates the selected carpool, it is passed down to the drop down list component
    const updateSelectedCarpool = (carpool: Carpool):void => {
    alert("selected carpool is:"+carpool.carpoolName)
    setSelectedCarpool(carpool)
    }

   /* //this function updates the API key, it is passed down to the setapi component
    const updateApiKey = (apiKey: string):void => {
        setApiKey(apiKey)
    }*/

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
        console.log("api data when update bracket is called")
        console.log(apiData)
        setPlayerList(assignBracketIds(apiData,playerList))    
        let tempMatchList;
        seed(apiData, playerList).then((value)=>
        {
            tempMatchList=value
        })
        setMatchList(tempMatchList)
        setBracketSubmitStatus(true)
    }
    
  

    //function called by the submit button. Retrieves bracket data from smashgg
    const handleSubmit= async (event: { preventDefault: () => void; })  => {
        event.preventDefault();
        await APICall(urlToSlug(url)!).then((value)=>
        {
            console.log(value.data.event.phaseGroups[0].id)
            getBracketData(value.data.event.phaseGroups[0].id).then((value)=>
        {
    
            console.log("api data will be set to")
            console.log(value)
            setApiData(value)
            setPlayerInfoFromPhase(value).then((value)=>
            {
                setPlayerList(value)
            })
            
            
        })
            setSubmitStatus(true)
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

    
    

   
 

    

      
    
    //return statement
    return(
            <div className={styles.SeedingApp}>
                {submitStatus?
                    <div className={styles.SeedingApp} >
                        <div className={styles.SeedingApp}>
                        <GenerateBracketButton playerList={playerList} updateBracket={updateBracket} />
                        <DisplayParticipantList pList={playerList} cList={carpoolList} updateSelectedCarpool={updateSelectedCarpool} addPlayerToCarpool={addPlayerToCarpool}/>
                        <CarpoolDisplay cList={carpoolList} pList={playerList} setPlayerFromButton={function (player: Competitor): void {
                        <DynamicBracketModule bracketSubmitStatus={BracketsubmitStatus} matchList={matchList}/>
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
            console.log(data)
            return data
        }
    )
}


