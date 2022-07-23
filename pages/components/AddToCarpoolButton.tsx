import Competitor from "../modules/Competitor";

interface buttonProps
{
    player:Competitor;
}
export default function AddToCarpoolButton({player}:buttonProps)
{


return(
    <button color="red" onClick={e => { alert("added to carpool: "+player.tag) }}> add to carpool</button> 
)
}