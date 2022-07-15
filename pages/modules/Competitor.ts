import { Participant } from "@g-loot/react-tournament-brackets/dist/src/types";

export default class Competitor
{
    ID: string;
    tag: string;
    rating: number;
    projectedPath:Participant[]=[];
    bracketID:number;
    seed:number;

    

    constructor(ID:string,tag:string,rating:number,bracketID:number,seed:number) {
      this.ID=ID;
      this.tag=tag;
      this.rating=rating;
      this.bracketID=bracketID;
      this.seed=seed;
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
    addPlayerToPath(player:Participant)
    {
      this.projectedPath.push(player)
    }

  }