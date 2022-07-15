import React,{ useState } from "react";
import Competitor from "../modules/Competitor";
import getList from "../modules/getList";
import urlToSlug from "../modules/urlToSlug";
import URLForm from "./URLForm";


interface DisplayListState{
    url:string,
    list:Competitor[]

}
export default class DisplayList extends React.Component<DisplayListState, { }>
{
   
    
    constructor(props:any) {
        super(props);
        
    }

  

    render() 
    {
        return(
            <div>
                 {
                this.props.list.map((e:Competitor)=>
                <>
                <div key={e.tag}>
                    <h3>ID: {e.ID}</h3>
                    <h3>Tag: {e.tag}</h3>
                    <h3>Rating: {e.rating.toFixed(2)}</h3>
                </div>
                
                </>
                )
                }

            </div>
           
        )
    }
    
        
}


