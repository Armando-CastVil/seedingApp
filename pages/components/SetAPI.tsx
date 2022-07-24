import { useEffect, useState } from "react";

interface props {
    
    updateApiKey: (apiKey: string) => void;
}
export default function SetAPI({updateApiKey}:props)
{
    const [apiKey,setNewKey]=useState<string>()
    useEffect(() => {
    updateApiKey(apiKey!)
    },[apiKey])

//function called by the submit button. Retrieves bracket data from smashgg
const handleSubmit= (event: { preventDefault: () => void; })  => {
    event.preventDefault();
    updateApiKey(apiKey!)
    alert("api key is:"+ apiKey)
    
}

return(
    <form onSubmit={e => { handleSubmit(e) }}>
                    <label>
                     API Key:
                    <input type="text"  onChange={e => setNewKey(e.target.value)}/> 
                    </label>
                    <input type="submit" value="Submit"  />
                    </form>
)
}