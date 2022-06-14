import urlToSlug from "../modules/urlToSlug";
import getCompetitorInfo from "../modules/getCompetitorInfo";
import Competitor from "../modules/Competitor";
import { useState } from "react";
export  default async function getList(slug:string)
{
    console.log("getlist was called with url: "+ slug)
    var entryList: Competitor[]=[];
    entryList=await getCompetitorInfo(slug)
    return entryList
}