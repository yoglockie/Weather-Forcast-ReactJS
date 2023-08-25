import React, { useState, useEffect } from "react";
import {Apartment,Cloud} from "@mui/icons-material";
import axios from "axios";
import apiKeys from "./apiKeys";


function Search_City(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
 
  const search = (city) => {
    axios
    .get(
        `${apiKeys.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };
 

  useEffect(() => {
    search("Jaipur");
  }, []);

  return (
    <div className="right">
       <div className="right-top">
              <Apartment style={{fontSize:"50px"}}></Apartment>
               <h1>Search Weather <br/>for any City</h1>
                                   
       </div>
      <div className="today-weather">
        
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            {" "}
            <img
             alt=""
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={search}
            />
          </div>
        </div>
        
        <div>
        
        {typeof weather.main != "undefined" ? 
        
        <div className="right-lower">
           {" "}
           <div className="searched-city cityHead">
                  <p className="hw-info" >
                   {weather.name}, {weather.sys.country}
                 </p>    
            </div>
            <div className="w-info">
                    <div className="wi-info">
                        <p className="hw-info">Temperature{" "}</p>
                        <p>{Math.round(weather.main.temp)}°c </p>
                    </div>
                    <div className="wi-info">
                    <p className="hw-info">Humidity{" "}</p>
                        <p>{Math.round(weather.main.humidity)}% </p>
                    </div>
                    <div className="wi-info">
                    <p className="hw-info">Visibility{" "}</p>
                        <p>{Math.round(weather.visibility)} mi </p>
                    </div>
                    <div className="wi-info">
                    <p className="hw-info">Wind Speed{" "}</p>
                    <p>{Math.round(weather.wind.speed)} Km/h </p>
                    </div>
            </div>
        </div>
        
        
        :
        
        
        <div className="cityHead">
          <p style={{color:"white"}}>{error.query} {error.message}</p>
        </div>
        
        
        }
        
        
        </div>
      </div>
    </div>
  );
  
}
export default Search_City;



  //  <ul>
  //         {typeof weather.main != "undefined" ? (
  //           <div>
  //             {" "}
  //             <li className="cityHead">
  //               <p>
  //                 {weather.name}, {weather.sys.country}
  //               </p>
  //               {/* <img
  //                 className="temp"
  //                 alt=""
  //                 src={`./images/cloud.jpg`}
  //               /> */}
  //             </li>
  //             <li>
  //               Temperature{" "}
  //               <span className="temp">
  //                 {Math.round(weather.main.temp)}°c 
  //               </span>
  //             </li>
  //             <li>
  //               Humidity{" "}
  //               <span className="temp">
  //                 {Math.round(weather.main.humidity)}%
  //               </span>
  //             </li>
  //             <li>
  //               Visibility{" "}
  //               <span className="temp">
  //                 {Math.round(weather.visibility)} mi
  //               </span>
  //             </li>
  //             <li>
  //               Wind Speed{" "}
  //               <span className="temp">
  //                 {Math.round(weather.wind.speed)} Km/h
  //               </span>
  //             </li>
  //           </div>
  //         ) : (
  //           <li>
  //             {error.query} {error.message}
  //           </li>
  //         )}
  //       </ul>


