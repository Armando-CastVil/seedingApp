import Seed from "./Seed";

export default class Player
{
    ID: string;
    tag: string;
    rating: number;
    carpool:number;
    seed: Seed;
    constructor(ID:string,tag:string,rating:number,carpool:number,seed:Seed) {
      this.ID=ID;
      this.tag=tag;
      this.rating=rating;
      this.carpool = carpool;
      this.seed=seed;
    }
}

