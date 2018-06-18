import React, { Component } from 'react';
import axios from 'axios';
import {Button,Typography,TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './App.css';

const styles = {
    div: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-evenly',
      //backgroundImage: `url("./image/Pic.jpg")`
    }
  }


export default withStyles(styles)(class Test extends Component{
    constructor(props){
        super(props);
        this.state={ info:'', value :''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    handleChange(event)
    {
        this.setState({value: event.target.value});
    }

    handleSubmit(event)
    {
        if(this.state.value){
        axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20item.condition.temp%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text=%27${this.state.value}%27)&format=json`).then(res =>{
            const info= res.data.query.results.channel.item.condition.temp;
            if(info){
                this.setState({info});
            }
            else
            {
                alert("Please enter a valid city name")
            }
        })
        .catch(error =>{
            alert("Error...Please enter a valid city name")
        });
        event.preventDefault();
        console.log("Info value:",this.state.info);
    }
        else
        {
            alert("Please enter a city name");
        }
    }




    render(){
        return(
            <div>
                <Typography variant='display1' align='center' gutterBottom>
        Weather App
      </Typography>
                <TextField name="box" label='City Name' margin='normal' onChange={this.handleChange} placeholder="Type here.." />   &nbsp;
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
        { /* <button onClick={this.handleSubmit}>Submit</button> */}
                <br></br>
                <br></br>
                <Typography variant="headline" gutterBottom>{this.state.info}°F</Typography>
            </ div>
        );
    }
}
)