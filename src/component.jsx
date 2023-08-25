import React from "react";
import { Cloud, SevereCold,Cyclone,Tornado} from "@mui/icons-material";

import {WbSunny} from "@mui/icons-material";
import Clock from "react-live-clock";
import apiKeys from "./apiKeys";
import Search_City from "./search_city";
const builddate=(d)=>{
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();   

      return `${day}, ${date} ${month} ${year}`;

    
}

const getforDate=(fd)=>{
      
      
       return (fd.getDate());
}

const getforMonth=(fm)=>{

    return (fm.getMonth());
}


class Weath extends React.Component{
    
    state = {
        lat: undefined,
        lon: undefined,
        errorMessage: undefined,
        temperatureC: undefined,
        temperatureF: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: "CLEAR_DAY",
        sunrise: undefined,
        sunset: undefined,
        errorMsg: undefined,
      };

      componentDidMount() {
        if (navigator.geolocation) {
          this.getPosition()
            //If user allow location service then will fetch data & send it to get-weather function.
            .then((position) => {
              this.getWeather(position.coords.latitude, position.coords.longitude);
            })
            .catch((err) => {
              //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
              this.getWeather(28.67, 77.22);
              alert(
                "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
              );
            });
        } else {
          alert("Geolocation not available");
        }
    
        this.timerID = setInterval(
          () => this.getWeather(this.state.lat, this.state.lon),
          600000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
    
      getPosition = (options) => {
        return new Promise(
          function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
          }
        );
      };
      getWeather = async (lat, lon) => {
        const api_call = await fetch(
          `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
        );
        
        const data = await api_call.json();
       
        this.setState({
          lat: lat,
          lon: lon,
          city: data.name,
          temperatureC: Math.round(data.main.temp),
          temperatureF: Math.round(data.main.temp * 1.8 + 32),
          humidity: data.main.humidity,
          main: data.weather[0].main,
          descr: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
          
          country: data.sys.country,
          speed: data.wind.speed,
          visibility:data.visibility,
         
        });

        
        switch (this.state.main) {
          case "Haze":
            this.setState({ icon: "CLEAR_DAY" });
            break;
          case "Clouds":
            this.setState({ icon: "CLOUDY" });
            break;
          case "Rain":
            this.setState({ icon: "RAIN" });
            break;
          case "Snow":
            this.setState({ icon: "SNOW" });
            break;
          case "Dust":
            this.setState({ icon: "WIND" });
            break;
          case "Drizzle":
            this.setState({ icon: "SLEET" });
            break;
          case "Fog":
            this.setState({ icon: "FOG" });
            break;
          case "Smoke":
            this.setState({ icon: "FOG" });
            break;
          case "Tornado":
            this.setState({ icon: "WIND" });
            break;
          default:
            this.setState({ icon: "CLEAR_DAY" });
        }
      };
    
      


    render(){
        return(
            <div className="container">
                <div className="left">
                    
                    <div className="left-upper">
                        <h1>{this.state.city}, {this.state.country}</h1>
                    </div>
                        
                    <div className="left-mid">
                        <div className="lleft-mid">
                            <h1><Clock format="HH:mm:ss" interval={1000} ticking={true} /></h1>
                            <h2>{builddate(new Date())}</h2>
                        </div>
                        <div className="left-mid-right">
                        <p style={{fontSize:'4em'}}>{this.state.temperatureC}°C <br/><span style={{fontSize:"50px"}}>{this.state.main}</span></p>
                        
                        </div>
                       
                    </div>
                   
                   <div className="left-lower">
                         <div className="forcast">
                              
                             <p>30°C</p>
                              <p>{getforDate(new Date()) + 1}/{getforMonth(new Date())}</p>
                                
                              
                         </div>
                         <div className="forcast">
                              
                              <p>30°C</p>
                              <p>{getforDate(new Date()) + 2}/{getforMonth(new Date())}</p>
                         </div>
                         <div className="forcast">
                              
                             <p>30°C</p>
                              <p>{getforDate(new Date()) + 3}/{getforMonth(new Date())}</p>
                         </div>
                         <div className="forcast">
                              
                             <p>30°C</p>
                              <p>{getforDate(new Date()) + 4}/{getforMonth(new Date())}</p>
                         </div>
                         <div className="forcast">
                              
                              <p>30°C</p>
                              <p>{getforDate(new Date()) + 5}/{getforMonth(new Date())}</p>
                         </div>
                   </div>
                </div>
                <Search_City weathe={this.state.main} ></Search_City>
                
            </div>
            
        )
    }
    
}

export default Weath;
                  
                
                  
    



                        