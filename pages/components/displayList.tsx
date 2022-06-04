import React from "react";
import Competitor from "../modules/Competitor";
import URLForm from "./URLForm";
export default class DisplayList extends React.Component
{
    
    constructor(props:any) {
        super(props);
        this.setStateOfDisplayer.bind(this);
        this.state = {entries: []};
    }
    setStateOfDisplayer = (newEntries:Competitor[]) => {
        this.setState({entries: newEntries});
      }
    render() {
        return (
            <div>
                <URLForm setStateOfDisplayer={undefined}/>
                
            </div>
            
        );
      }
    }
      
