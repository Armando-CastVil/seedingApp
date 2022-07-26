const whitelistedHashes = [
    "4fe851e918b4cd863608ac70d2a6529483f43e104392a2635afbb08b216bc214", //DN
    "eddef60d2143e015a188b449c253380b1d4589b3334622e967211023368d2b03", //AC
]

export async function isWhitelisted(key: string):Promise<boolean> {
    let hashedKey = await sha256(key)
    let toReturn = whitelistedHashes.includes(hashedKey);
    if(!toReturn) console.log("hashed key: "+hashedKey)
    return toReturn;
}

export async function sha256(message:string):Promise<string> {
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