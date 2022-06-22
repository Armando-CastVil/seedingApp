export default class Competitor
{
    ID: String;
    tag: string;
    rating: number;
    projectedPath:Competitor[]=[];
    bracketID:number;
    

    constructor(ID:String,tag:string,rating:number,bracketID:number) {
      this.ID=ID;
      this.tag=tag;
      this.rating=rating;
      this.bracketID=bracketID;
    }
    setrating(newRating:number)
    {
      this.rating=newRating
    }
    setBracketID(newBracketID:number)
    {
      this.bracketID=newBracketID
    }
    addPlayerToPath(player:Competitor)
    {
      this.projectedPath.push(player)
    }

  }