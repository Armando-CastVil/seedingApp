import Carpool from "../modules/Carpool";
import Competitor from "../modules/Competitor";

interface props {
    playerList: Competitor[];
    generateBracket: (playerList:Competitor[]) => void
}
export default function GenerateBracketButton({playerList,generateBracket}:props)
{


return(
    <button color="red" onClick={e => { generateBracket(playerList) }}> Generate Bracket</button> 
)
}