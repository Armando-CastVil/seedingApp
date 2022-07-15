import Player from "./Player";

export default function getTagsandIDs(entrantData:any):Player[]
{
    let entryList:Player[]=[];
    async function processList()
    {
        await fillArray();
       
    }

    function fillArray()
    {
        for(let i=0;i<entrantData.length;i++)
    {
        let  entry= new Player(entrantData[i].participants[0].player.id.toString(),entrantData[i].participants[0].gamerTag,0,-1,null)
        entryList[i]=entry
        
    }   
    }

    processList();
    return entryList
}