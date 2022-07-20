import { Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "./Competitor";

export default class Carpool
{
    carpoolName: string|number;
    carpoolMembers:Competitor[]
    

    
    //constructor
    constructor(carpoolName:string|number,carpoolMembers:Competitor[]) {
      this.carpoolName=carpoolName;
      this.carpoolMembers=carpoolMembers;
      
    }
    
    
    addCarpoolMember(player:Competitor)
    {
      this.carpoolMembers.push(player)
    }
  }