import React from "react";
import getTourneyEntrants from "../getTourneyEntrants";
import urlToSlug from "../modules/urlToSlug";
import getCompetitorInfo from "../modules/getCompetitorInfo";
export default class URLForm extends React.Component <{}, { value: string }>
  {
   
    
    
    constructor(props:any) {
      super(props);
      url:""
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    
    }

   

    handleChange(event: { target: { value: any; }; }) {
      this.setState({value: event.target.value});
      
    }

    handleSubmit(event: { preventDefault: () => void; }) {
        //getCompetitorInfo();
      event.preventDefault();
      
    }

    

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            URL:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }

  }
  