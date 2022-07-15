import urlToSlug from "./urlToSlug";
import getCompetitorInfo from "./getCompetitorInfo";
import { useState } from "react";
import Player from "./Player";
export  default async function getList(slug:string)
{
    console.log("getlist was called with url: "+ slug)
    var entryList: Player[]=[];
    entryList=await getCompetitorInfo(slug)
    return entryList
}