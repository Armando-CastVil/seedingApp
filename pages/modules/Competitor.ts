import { Participant } from "@g-loot/react-tournament-brackets/dist/src/types";

export default class Competitor
{
    smashggID: string;
    bracketID:number;
    tag: string;
    rating: number;
    seed:number;
    region:string|undefined;
    carpool:number|string|undefined;
    isWinner: boolean;
    projectedPath:Competitor[]=[];

    

    constructor(smashggID:string,bracketID:number,tag:string,rating:number,seed:number,region:string|undefined,carpool:number|string|undefined,isWinner:boolean) {
      this.smashggID=smashggID;
      this.bracketID=bracketID;
      this.tag=tag;
      this.rating=rating;
      this.seed=seed;
      this.region=region;
      this.carpool=carpool
      this.isWinner=isWinner
    }
    setRating(newRating:number)
    {
      this.rating=newRating
    }
    setBracketID(newBracketID:number)
    {
      this.bracketID=newBracketID
    }
    setSeed(seed:number)
    {
      this.seed=seed
    }
    addPlayerToPath(player:Competitor)
    {
      this.projectedPath.push(player)
    }
  }