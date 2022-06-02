import Competitor from "./Competitor"
export default function getTagsandIDs(entrantData:any):Competitor[]
{
    let entryList:Competitor[]=[];
    async function processList()
    {
        await fillArray();
       
    }

    function fillArray()
    {
        for(let i=0;i<entrantData.length;i++)
    {
        let  entry= new Competitor(entrantData[i].participants[0].player.id.toString(),entrantData[i].participants[0].gamerTag,0)
        entryList[i]=entry
        
    }   
    }

    processList();
    return entryList
}