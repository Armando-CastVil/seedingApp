import { Match,Participant } from "@g-loot/react-tournament-brackets/dist/src/types";
import Competitor from "../Competitor";
import fillInitialRounds from "./fillInitialRounds";
import processResults from "./processResults";
import { reportResults } from "./reportResults";
import setMatchStructure from "./setMatchStructure";

//interface for the object we will be returning
interface MatchStructure
{
    upper:Match[],
    lower:Match[]
}

//note: competitor is a class that is used for processing purposes, participant is used for displaying purposes.

//this function returns the list of all matches in the tournament and all the data that comes with it
export default function getMatchList(data:any,playerList:Competitor[])
{
    console.log("get matchlist called")
    //initializing arrays
    //setList is an array of matches with no distinction between winners bracket and losers bracket
    var setList:Match[]=[];
    //matchList is the setList but with distinction between winners and losers bracket, this is the object that this function returns
    var matchList:MatchStructure=
    {
        upper:[],
        lower:[]
    }
    //fills in the info for round 1 only, since they are the only unprocessed matches
    setList=fillInitialRounds(data,playerList)
    //temporary set list to avoid changing the original one
    let tempSetList=JSON.parse(JSON.stringify(setList))

    //process results for every round
    for(let i=0;i<(2*Math.log2(playerList.length)+1);i++)
    {
        //this array holds only the sets that have results that have been set during a given round
        var setsWithResults:any=[]
        //object that holds an object with setlist with processed matches and their indexes
        let resultData:any
        //that data is copied in to their respective variables
        resultData=processResults(tempSetList,playerList)
        tempSetList=JSON.parse(JSON.stringify(resultData.setList))
        setsWithResults=[...resultData.setsWithResults]
        //using the data from before, the results are reported/set in to the setlist
        tempSetList=JSON.parse(JSON.stringify(reportResults(data,playerList,tempSetList,setsWithResults)))
        //sets with results are reset to be used on the next round
        setsWithResults=[];

    }

    //after all the sets are processed, separate winners and losers sets
    matchList=setMatchStructure(tempSetList,data,matchList)
    //set the next match of grands to null to prevent an error
    matchList.upper[matchList.upper.length-1].nextMatchId=null

    console.log("rewritten matchlist")
    console.log(matchList)
    return matchList


  
}