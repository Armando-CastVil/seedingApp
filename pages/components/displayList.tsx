import React from "react";
import Competitor from "../modules/Competitor";
import URLForm from "./URLForm";
export default class displayList extends React.Component
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
           // <URLForm setStateOfDisplayer = {this.setStateOfDisplayer}/>
           <h1>displaylist was called</h1>
        );
      }
    }
      
