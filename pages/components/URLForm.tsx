import React from "react";
import getTourneyEntrants from "../getTourneyEntrants";
import urlToSlug from "../modules/urlToSlug";
import getCompetitorInfo from "../modules/getCompetitorInfo";
import getList from "./getList";
import Competitor from "../modules/Competitor";
import { timeStamp } from "console";
import DisplayList from "./displayList";


export default class URLForm extends React.Component <{}, { value: string }>
  {
    isSubmitted: boolean;
  list: Competitor[];
 
    
    
    constructor(props:any) {
      super(props);

      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.isSubmitted=false;
      this.list=[]
      
      
    }

    

    handleChange(event: { target: { value: any; }; }) {
      this.setState({value: event.target.value});

    }
    

    async handleSubmit(event: { preventDefault: () => void; }) {
      //send value to getlist
      event.preventDefault();
      this.state=({value:urlToSlug(this.state.value)!})
      await this.listFIll()
      await this.setSubmitToTrue()
      
    }
    setSubmitToTrue() {
      this.isSubmitted=true;
    }

    listFIll()
    {
      getList(this.state.value).then((value)=>
      this.list=value
      )
      this.state=({value:""})
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
        {this.isSubmitted?
         <DisplayList url={this.state.value} list={this.list}></DisplayList>
         
         :<h3>loading</h3>
        }
        
        </div>
      
      );
    }

  }


  