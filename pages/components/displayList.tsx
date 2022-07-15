import React,{ useState } from "react";
import getList from "../modules/getList";
import urlToSlug from "../modules/urlToSlug";
import URLForm from "./URLForm";
import Player from "../modules/Player";


interface DisplayListState{
    url:string,
    list:Player[]

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
                this.props.list.map((e:Player)=>
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


