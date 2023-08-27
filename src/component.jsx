import React from "react";
import { Cloud } from "@mui/icons-material";

import {WbSunny} from "@mui/icons-material";
import Clock from "react-live-clock";
import apiKeys from "./apiKeys";
import Search_City from "./search_city";
import { Icon } from "@mui/material";

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

const getforDate=(fd,i)=>{
      
     let st = new Date(fd.setDate(fd.getDate()+i))
     let d= st.getDate();
     if(d<10)
     {
      let t = '0'+d;
      return t
     }
      return d;
}

const getforMonth=(fm,i)=>{
  let st = new Date(fm.setDate(fm.getDate()+i))
  let d= st.getMonth()+1;
  if(d<10)
     {
      let t = '0'+d;
      return t
     }
   return d;
   
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
        temp1:undefined,
        temp2:undefined,
        temp3:undefined,
        temp4:undefined,
        temp5:undefined,
        icon1:undefined,
        icon2:undefined,
        icon3:undefined,
        icon4:undefined,
        icon5:undefined,
        
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
        console.log(data)

        const api_call_forecast = await fetch(
          `${apiKeys.base}forecast?lat=${lat}&lon=${lon}&appid=${apiKeys.key}`
        );
        const forecast_data = await api_call_forecast.json();
        console.log(forecast_data)

        
       
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
          temp1:forecast_data.list[1].main.temp,
          temp2:forecast_data.list[2].main.temp,
          temp3:forecast_data.list[3].main.temp,
          temp4:forecast_data.list[4].main.temp,
          temp5:forecast_data.list[5].main.temp,
          icon1:forecast_data.list[1].weather[0].icon,
          icon2:forecast_data.list[2].weather[0].icon,
          icon3:forecast_data.list[3].weather[0].icon,
          icon4:forecast_data.list[4].weather[0].icon,
          icon5:forecast_data.list[5].weather[0].icon,
          icon:data.weather[0].icon,
        });

        
       
      };
    
      
      


    render(){
      const icon1 = this.state.icon1;
      const icon2 = this.state.icon2;
      const icon3 = this.state.icon3;
      const icon4 = this.state.icon4;
      const icon5 = this.state.icon5;
      
      
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
                              
                            <p>{Math.round((this.state.temp1)-273)}°C</p>
                            <img src={`https://openweathermap.org/img/wn/${icon1}@2x.png`} alt="" height={"50px"} width={"50px"}/>
                            <p>Tomorrow</p>
                               
                              
                                
                              
                         </div>
                         <div className="forcast">
                              
                              <p>{Math.round((this.state.temp2)-273)}°C</p>
                              <img src={`https://openweathermap.org/img/wn/${icon2}@2x.png`} alt="" height={"50px"} width={"50px"}/>
                              <p>{getforDate(new Date(),2)}/{getforMonth(new Date(),2)}</p>
                         </div>
                         <div className="forcast">
                              
                             <p>{Math.round((this.state.temp3)-273)}°C</p>
                             <img src={`https://openweathermap.org/img/wn/${icon3}@2x.png`} alt="" height={"50px"} width={"50px"}/>
                              <p>{getforDate(new Date(),3)}/{getforMonth(new Date(),3)}</p>
                         </div>
                         <div className="forcast">
                              
                             <p>{Math.round((this.state.temp4)-273)}°C</p>
                             <img src={`https://openweathermap.org/img/wn/${icon4}@2x.png`} alt="" height={"50px"} width={"50px"}/>
                              <p>{getforDate(new Date(),4) }/{getforMonth(new Date(),4)}</p>
                         </div>
                         <div className="forcast">
                              
                              <p>{Math.round((this.state.temp5)-273)}°C</p>
                              <img src={`https://openweathermap.org/img/wn/${icon5}@2x.png`} alt="" height={"50px"} width={"50px"}/>
                              <p>{getforDate(new Date(),5)}/{getforMonth(new Date(),5)}</p>
                         </div>
                   </div>
                </div>
                <Search_City weathe={this.state.main} ></Search_City>
                
            </div>
            
        )
    }
    
}

export default Weath;
                  
                
   