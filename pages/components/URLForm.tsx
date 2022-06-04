import React from "react";
import getTourneyEntrants from "../getTourneyEntrants";
import urlToSlug from "../modules/urlToSlug";
import getCompetitorInfo from "../modules/getCompetitorInfo";
import getList from "./getList";
import Competitor from "../modules/Competitor";
import { timeStamp } from "console";
export default class URLForm extends React.Component <{setStateOfDisplayer: any}, { value: string }>
  {
    list:Competitor[];
    
    
    constructor(props:any) {
      super(props);

      this.state = {value: ''};
      this.list=[];
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
      
    }

    

    handleChange(event: { target: { value: any; }; }) {
      this.setState({value: event.target.value});
      
    }

    async handleSubmit(event: { preventDefault: () => void; }) {
      //send value to getlist
      event.preventDefault();
      this.list=await getList(this.state.value)
      return(
        <div>
        <ol>
        
        {this.list.map((p:any)=>(
           
            <li key={p.ID}>Player ID:{p.ID} Player Tag: {p.tag} Player Rating: {p.rating}</li>
            
        ))}
        </ol>
    </div>
      )
      //await getList(this.state.value)
    }

    

    render() {
      return (
        <div>
            <form onSubmit={this.handleSubmit}>
          <label>
            URL:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            
          </label>
          <input type="submit" value="Submit" />
        </form>
         
        </div>
      
      );
    }

  }
  