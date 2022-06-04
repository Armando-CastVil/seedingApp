import urlToSlug from "../modules/urlToSlug";
import getCompetitorInfo from "../modules/getCompetitorInfo";
import Competitor from "../modules/Competitor";
import { useState } from "react";
import displayList from "./displayList";
export  default async function getList(url:string)
{
    console.log("getlist was called with url: "+ url)
    var entryList: Competitor[]=[];
    let slug:string=urlToSlug(url)!;
    entryList=await getCompetitorInfo(slug)
    return entryList
}