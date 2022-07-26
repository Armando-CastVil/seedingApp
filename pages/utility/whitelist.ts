const whitelistedHashes = [
    "4fe851e918b4cd863608ac70d2a6529483f43e104392a2635afbb08b216bc214",
    "07123e1f482356c415f684407a3b8723e10b2cbbc0b8fcd6282c49d37c9c1abc"
]

export async function isWhitelisted(key: string):Promise<boolean> {
    let hashedKey = await sha256(key)
    let toReturn = whitelistedHashes.includes(hashedKey);
    if(!toReturn) console.log("hashed key: "+hashedKey)
    return toReturn;
}

async function sha256(message:string):Promise<string> {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}