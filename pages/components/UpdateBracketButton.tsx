import Carpool from "../modules/Carpool";
import Competitor from "../modules/Competitor";

interface props {
    playerList: Competitor[];
    updateBracket: (playerList:Competitor[]) => void
}
export default function UpdateBracketButton({playerList,updateBracket}:props)
{


return(
    <button color="red" onClick={e => { updateBracket(playerList) }}> Generate/Update Bracket</button> 
)
}