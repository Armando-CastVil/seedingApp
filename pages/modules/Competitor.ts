import { Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Player from "./Player";

export default class Competitor
{
    player: Player;
    projectedPath:Participant[]=[];
    bracketID:number;

    

    constructor(player:Player, bracketID:number) {
      this.bracketID=bracketID;
      this.player = player;
    }
    setRating(newRating:number)
    {
      this.player.rating=newRating
    }
    setBracketID(newBracketID:number)
    {
      this.bracketID=newBracketID
    }
    // setSeed(seed:number)
    // {
    //   this.seed=seed
    // }
    addPlayerToPath(player:Participant)
    {
      this.projectedPath.push(player)
    }

  }