import Competitor from "./Competitor"
import getData from "./getData"
import getTagsandIDs from "./getTagandIDs"
import getRating from "./getRating"
import setRating from "./setRating"
import sortByRating from "./sortByRating"


export default async function getCompetitorInfo(url:string)
{
    
    
    const playerData: any= await getData(url)
    const entryList= await getTagsandIDs(playerData)
    //everything works until here
    const ratedList=await setRating(entryList)
    const sortedList=sortByRating(ratedList)
    return sortedList
}

    

