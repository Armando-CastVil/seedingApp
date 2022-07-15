// Import the functions you need from the SDKs you need
import getRating from "./getRating";
import Player from "./Player";

export default async function setRating(entryList:Player[]):Promise<Player[]>
{
        for(let i=0;i<entryList.length;i++)
        {
            entryList[i].rating = await getRating(entryList[i].ID);
        }
        
        return entryList   
} 