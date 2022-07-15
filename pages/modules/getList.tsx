import urlToSlug from "./urlToSlug";
import getCompetitorInfo from "./getCompetitorInfo";
import Competitor from "./Competitor";
import { useState } from "react";
export  default async function getList(slug:string)
{
    console.log("getlist was called with url: "+ slug)
    var entryList: Competitor[]=[];
    entryList=await getCompetitorInfo(slug)
    return entryList
}