import Competitor from "./Competitor"
import getData from "./getData"
import getTagsandIDs from "./getTagandIDs"
import getRating from "./getRating"
import setRating from "./setRating"
import sortByRating from "./sortByRating"


export default async function getCompetitorInfo(slug:string,apiKey:string)
{
    
    console.log("getcompetitor info was called with slug "+slug)
    const playerData: any= await getData(slug,apiKey)
    const entryList= await getTagsandIDs(playerData)
    const ratedList=await setRating(entryList)
    const sortedList=sortByRating(ratedList)
    return sortedList
}

    

