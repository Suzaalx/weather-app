import React ,{useState} from "react";
import axios from "axios";
import { API_KEY } from "./api";
function App() {
   const [data,setData]= useState({})
   const [location,setLocation] =useState("")

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;

   const searchLocation = async (event) => {
     if (event.key === "Enter") {
       try {
         const response = await axios.get(url);
         setData(response.data);
         console.log(response.data);
       } catch (error) {
         console.log(error);
       }
       setLocation("");
     }
   };
   
   

  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={ event=> setLocation(event.target.value)}
        onKeyPress = {searchLocation}
        placeholder ="Enter Location"
        type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}C</h1> : null}
            
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            
          </div>
        </div>


        {data.main !== undefined &&
         <div className="bottom">
         <div className="feels">
           {data.main ? <p className="bold">{data.main.feels_like}F</p> : null}
           
           <p>Feels like</p>
         </div>
         <div className="humidity">
           {data.main ? <p className="bold">{data.main.humidity}</p> : null}
           
           <p>humidity</p>
         </div>
         <div className="wind">
           {data.wind ? <p className="bold">{data.wind.speed}MPH</p> : null}
           
           <p>Wind Speed</p>
         </div>
         </div>
        }
       
      </div>
    </div>
  );
}

export default App;
