import Carpool from "../modules/Carpool";
import Competitor from "../modules/Competitor";

interface props {
    player: Competitor;
    addPlayerToCarpool: (arg: Competitor) => void
}
export default function AddToCarpoolButton({player,addPlayerToCarpool}:props)
{


return(
    <button color="red" onClick={e => { addPlayerToCarpool(player) }}> add to carpool</button> 
)
}