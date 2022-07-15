import variables from "./variables";
import urlToSlug from "./urlToSlug";
import getCompetitorInfo from "./getCompetitorInfo";
import Player from "./Player";
import getAllSeedingInfo from "./getAllSeedingInfo";

export default async function loadTournament(key:string,url:string) {
    variables.apiKey = key;
    variables.eventSlug = urlToSlug(url);
    if(variables.eventSlug == undefined) return;
    let localStorageCarpools = localStorage.getItem(variables.eventSlug+" carpools");
    let carpoolIDs:string[][] = [];
    if(localStorageCarpools != null) {
        carpoolIDs = JSON.parse(localStorageCarpools);
    }
    variables.seeding = await getCompetitorInfo(variables.eventSlug);
    variables.carpools = [];
    variables.noCarpoolPlayers = [];
    variables.selectedPlayers = [];
    for(let i = 0; i<carpoolIDs.length; i++) {
        variables.carpools.push([]);
    }
    for(let i = 0; i<variables.seeding.length; i++) {
        let found:boolean = false;
        for(let j = 0; j<carpoolIDs.length && !found; j++) {
            for(let k = 0; k<carpoolIDs[j].length && !found; k++) {
                if(carpoolIDs[j][k] == variables.seeding[i].ID) {
                    found = true;
                    variables.carpools[j].push(variables.seeding[i]);
                }
            }
        }
        if(!found) variables.noCarpoolPlayers.push(variables.seeding[i]);
    }
    for(let i = 0; i<variables.carpools.length; i++) {
        if(variables.carpools[i].length == 0) variables.carpools.splice(i,1);
    }
}