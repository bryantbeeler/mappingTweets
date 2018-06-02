import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TwitterHandle from './TwitterHandle.js'
import apiKey from './key_creds.js'

{/* <InfoWindow /> gives the ability to pop up "more info" on the Map */}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      messageFromExpress: [],
      currLocation: "+Oakland, +CA",
      locations: []

    };
  }

  componentDidMount(){
    this.getStuffFromExpress();
  }

  // Grab Location from twitter and convert to Geo Location
  getGeoCode(){
    axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=+${this.state.currLocation}&key=${apiKey}`
    }).then(geoData => {
      let addLocation = this.state.locations;
      if(geoData.data.results[0] != null){
        addLocation.push(geoData.data.results[0].geometry.location);
        this.setState({locations: addLocation})
      }
    });
  }

  // Grab stuff from Twitter API
  getStuffFromExpress(){
    axios({
      method: 'get',
      url: 'http://localhost:3030/askTwitter',
    }).then(responseFromExpress => {
      let array = [];

      responseFromExpress.data.forEach(element => {

        let strArray = element.location.split(', ');
        for(let i=0; i < strArray.length; i++){
          strArray[i] = "+" + strArray[i];
        }
        let myLocation = strArray.join('');
        this.setState({currLocation: myLocation});

        array.push(element);
        this.getGeoCode();
      });
      
      this.setState({
        messageFromExpress: array
      });
    });
  }

  // Does something when marker is click
  onMarkerClick(props, marker, e){
  
    this.setState({
      selectedPlace: props,
       activeMarker: marker,
      showingInfoWindow: true
    });
  }


  render() {
    let markerList = [];
    let infoList = [];
    let dataList = [];



    // Place markers around the map 
    this.state.locations.map((element, index)=>{
      markerList.push(<Marker
        // Allows us to click on this marker to do something (show tweet)
        onClick={(e)=>{this.onMarkerClick(e)}}

        // name: Controls what goes inside the box
        name={<TwitterHandle twitterHandle={this.state.messageFromExpress[index]}/>}

        // posiition: posisition of the Marker on the map
        position={{lat: element.lat, lng: element.lng}} 
      />);
    });

  return (
      <div className="App">
        {/* DISPLAY THE MAP */}
        <Map className="map"
        //{/*  SIZE OF MAP COMPARE TO SCREEN*/}
          style={{
            height: "100%",  
            width: "100%",
            }}
            google={this.props.google}
            //{/* INTIALIZE CENTER OF MAP */}
            initialCenter={{
              lat: 40.854885,
              lng: -88.081807 
            }}

           // {/* CONTROL ZOOM OF MAP */}
            zoom={4}
        >  

        {/* LIST of multiple <Marker>...</Marker> setup above */}
        {markerList}

        {/* Displays the tweet box */}
        
        <InfoWindow 
          position = {this.state.selectedPlace.position}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow} 
        > 
            {this.state.selectedPlace.name}
        </InfoWindow> 
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey,
})(App);

