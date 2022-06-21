import Competitor from "./Competitor";
import fillByes from "./fillByes";
export default function sortByRating(entryList:Competitor[]):Competitor[]
{
 
entryList=fillByes(entryList)
const sortedList=entryList.sort((entry1,entry2)=>(entry1.rating<entry2.rating)? 1 :(entry1.rating>entry2.rating) ?-1:0);
sortedList.forEach((entry)=>
console.log(entry.tag+ entry.rating)
)
return sortedList
}