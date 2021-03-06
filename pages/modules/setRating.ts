// Import the functions you need from the SDKs you need
import Competitor from "./Competitor";
import getRating from "./getRating";

export default async function setRating(entryList:Competitor[]):Promise<Competitor[]>
{
        for(let i=0;i<entryList.length;i++)
        {
            entryList[i].setRating(await getRating(entryList[i].smashggID))
        }
        
        return entryList   
} 