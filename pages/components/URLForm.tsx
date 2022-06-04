import React from "react";
import getTourneyEntrants from "../getTourneyEntrants";
import urlToSlug from "../modules/urlToSlug";
import getCompetitorInfo from "../modules/getCompetitorInfo";
import getList from "./getList";
import Competitor from "../modules/Competitor";
import displayList from "./displayList";
export default class URLForm extends React.Component <{}, { value: string }>
  {
    
    
    constructor(props:any) {
      super(props);

      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
      
    }

    

    handleChange(event: { target: { value: any; }; }) {
      this.setState({value: event.target.value});
      
    }

    async handleSubmit(event: { preventDefault: () => void; }) {
      //send value to getlist
      event.preventDefault();
      return (
        <div>
          {displayList(await getList(this.state.value))}
        </div>
      );
      
      
      
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
  