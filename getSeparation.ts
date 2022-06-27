import { initializeApp } from "firebase/app";
import { getDatabase,ref,get } from "firebase/database";
import { firebaseConfig } from "../utility/firebaseConfig";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const conservativity = 1000;

//all paramaters are 1 indexed
export default async function getSeparation(projectedMatchesArray:number[][], ids:string[], ratings:number[], carpools:number[][]): Promise<number[]> {
    const maximumFunctionRuntime:number = 10000;
    const start:number = Date.now();
    const end:number = start+maximumFunctionRuntime;
    let players: ({
        id: string, 
        rating: number, 
        newSeed: number, 
        ogSeed: number,
        histories: {[opponent: number]:number}, 
        ogProjectedMatches: number[],
        projectedSetHistories: number,
        geoDistFromOGseed: number,
        carpool: Set<number>
    })[] = []
    let ogSeeds:number[] = [];
    for(let i = 0; i<ids.length-1; i++) {
        players.push({
            id: ids[i+1],
            rating: ratings[i+1],
            newSeed: i,
            ogSeed: i,
            histories: {},
            ogProjectedMatches: [],
            projectedSetHistories: 0,
            geoDistFromOGseed: conservativity,
            carpool: new Set<number>()
        });
        ogSeeds.push(i);
    }
    for(let i = 0;i<projectedMatchesArray.length; i++) {
        players[projectedMatchesArray[i][0]-1].ogProjectedMatches.push(projectedMatchesArray[i][1]-1);
        players[projectedMatchesArray[i][1]-1].ogProjectedMatches.push(projectedMatchesArray[i][0]-1);
    }
    for(let i = 0; i<carpools.length; i++) {
        let carpool = carpools[i];
        for(let j = 0; j<carpool.length; j++) {
            for(let k = j+1; k<carpool.length; j++) {
                players[carpool[j]].carpool.add(carpool[k]);
                players[carpool[k]].carpool.add(carpool[j]);
            }
        }
    }
    let heuristicContributions:any[] = [];
    for(let i = 0; i<players.length; i++) {
        players[i].projectedSetHistories = await getProjectedSetHistories(i,ogSeeds,players);
        heuristicContributions.push(players[i]);
    }
    let hueristicSort = (a:any,b:any) => 
          b.projectedSetHistories
        + b.geoDistFromOGseed
        - a.projectedSetHistories 
        - a.geoDistFromOGseed;
    heuristicContributions.sort(hueristicSort);
    let currHC = 0;
    let player1 = heuristicContributions[currHC];
    while(Date.now()<end && player1.projectedSetHistories + player1.geoDistFromOGseed > 0) {
        player1 = heuristicContributions[currHC];
        if(player1.ogSeed<4) {
            currHC++;
            continue;
        }
        let lastPowerOf2 = 2 ** Math.floor(Math.log2(player1.newSeed));
        let ceiling:number;//exclusive
        let floor:number;//inclusive
        if(player1.ogSeed>=lastPowerOf2*1.5) {
            ceiling = 2*lastPowerOf2;
            floor = 1.5*lastPowerOf2;
        } else {
            ceiling = 1.5*lastPowerOf2;
            floor = lastPowerOf2;
        }
        let upperIndex:number = player1.ogSeed + 1;
        let lowerIndex:number = player1.ogSeed - 1;
        let i:number = player1.ogSeed;
        let swapMade:boolean = false;
        while(player1.geoDistFromOGseed + 2*player1.projectedSetHistories 
            > getGeoDist(i,player1.ogSeed,players)**2) {
            let player2 = players[ogSeeds[i]];
            if(player1 == player2) continue;
            let heuristicChange = - player1.projectedSetHistories
                                  - player2.projectedSetHistories
                                  - player1.geoDistFromOGseed
                                  - player2.geoDistFromOGseed;
            await swap(player1,player2,ogSeeds,players);
            heuristicChange +=  player1.projectedSetHistories
                            +   player2.projectedSetHistories
                            +   player1.geoDistFromOGseed
                            +   player2.geoDistFromOGseed;
            if(heuristicChange > 0) swap(player1, player2, ogSeeds, players);
            else {
                swapMade = true;
                break;
            }
            if(upperIndex >= ceiling && lowerIndex<floor) break;
            else if(upperIndex >= ceiling) {
                i = lowerIndex;
                lowerIndex--;
            } else if(lowerIndex < floor) {
                i = upperIndex;
                upperIndex++;
            } else {
                let upperDist = getGeoDist(player1.ogSeed,upperIndex,players);
                let lowerDist = getGeoDist(player1.ogSeed,lowerIndex,players);
                if(lowerDist>upperDist) {
                    i = upperIndex
                    upperIndex++;
                } else {
                    i = lowerIndex;
                    lowerIndex--;
                }
            }
        }
        if(swapMade) {
            currHC = 0;
            heuristicContributions.sort(hueristicSort);
        }
        else currHC++;
    }
    return ogSeeds;
}

async function swap(p1:any, p2:any, ogSeeds:number[], players:any) {
    let temp:number = p1.newSeed;
    p1.newSeed = p2.newSeed;
    p2.newSeed = temp;
    ogSeeds[p1.newSeed] = p1.ogSeed;
    ogSeeds[p2.newSeed] = p2.ogSeed;
    p1.projectedSetHistories = await getProjectedSetHistories(p1,ogSeeds,players);
    p2.projectedSetHistories = await getProjectedSetHistories(p2,ogSeeds,players);
    p1.geoDistFromOGseed = getGeoDist(p1.newSeed, p1.ogSeed, players)**2;
    p2.geoDistFromOGseed = getGeoDist(p2.newSeed, p2.ogSeed, players)**2;
}

function getGeoDist(seed1:number, seed2: number, players:any):number {
    let d1 = players[seed1].rating/players[seed2].rating;
    let d2 = players[seed2].rating/players[seed1].rating;
    return Math.max(d1,d2)*conservativity;
}

async function getProjectedSetHistories(player:any, ogSeeds:number[], players:any):Promise<number> {
    let toReturn = 0;
    let projectedOpponents = players[player.newSeed].ogProjectedMatches;
    for(let i = 0; i<projectedOpponents; i++) {
        let opponent = players[ogSeeds[projectedOpponents[i]]];
        if(!player.histories.has(opponent.ogSeed)) {
            let history = (await get(ref(db,"players/"+player.id+"/sets/"+opponent.id))).val();
            if(history == undefined) {
                player.histories[opponent.ogSeed] = 0;
                opponent.histories[player.ogSeed] = 0;
            } else {
                player.histories[opponent.ogSeed] = history;
                opponent.histories[player.ogSeed] = history;
            }
            if(player.carpool.has(opponent.ogSeed))  {
                player.histories[opponent.ogSeed] += 200;
                opponent.histories[player.ogSeed] += 200;
            }
        }
        toReturn += (player.histories[opponent.ogSeed])**2/projectedOpponents.length;
    }
    return toReturn;
}