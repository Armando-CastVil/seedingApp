export default class Competitor
{
    ID: String;
    tag: string;
    rating: number;
    

    constructor(ID:String,tag:string,rating:number) {
      this.ID=ID;
      this.tag=tag;
      this.rating=-1;
    }
    setrating(newRating:number)
    {
      this.rating=newRating
    }

  }