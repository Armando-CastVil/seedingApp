import Competitor from "./Competitor"
import getData from "./getData"
import getTagsandIDs from "./getTagandIDs"
import getRating from "./getRating"
import setRating from "./setRating"
import sortByRating from "./sortByRating"


export default async function getCompetitorInfo(slug:string)
{
    
    console.log("getcompetitor info was called with slug "+slug)
    const playerData: any= await getData(slug)
    const entryList= await getTagsandIDs(playerData)
    //everything works until here
    const ratedList=await setRating(entryList)
    const sortedList=sortByRating(ratedList)
    return sortedList
}

    

