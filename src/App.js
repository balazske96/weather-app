import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import DaysContainer from './components/DaysContainter';
import PresentWeather from './components/PresentWeather';
import RAINY from './backgrounds/RAINY.jpg';
import SUNNY from './backgrounds/SUNNY.jpg';
import CLOUDY from './backgrounds/CLOUDY.jpg';
import axios from 'axios';

function App() {


  // This function is just a helper function to avoid react http's problem
  if(window.location.protocol === 'https:'){
      window.location.href = 'http://venyige-weather.herokuapp.com';
      window.location.reload();
  }
  //Function ends (delete later)

  setInterval(() => {
    window.location.reload();
  }, 30000)


  useEffect(() => {
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=Budapest,hu&units=metric&APPID=f20aa9b471478b0c833a2bea588f7a05')
      .then(res => {
        if (res.data.weather[0].main == 'Clear') {
          document.body.style.backgroundImage = `url(${SUNNY})`;
          document.body.style.backgroundSize = 'cover';
        }
        else if (res.data.weather[0].main = 'Clouds') {
          document.body.style.backgroundImage = `url(${CLOUDY})`;
          document.body.style.backgroundSize = 'cover';
        }
        else {
          document.body.style.backgroundImage = `url(${RAINY})`;
          document.body.style.backgroundSize = 'cover';
        }
      })
      .catch(error => {

        document.body.style.backgroundImage = `url(${SUNNY})`;
        document.body.style.backgroundSize = 'cover';
      })
  }, [])


  return (
    <div className='weather-components-container' > 
      <PresentWeather></PresentWeather>
      <DaysContainer></DaysContainer>
    </div>
  );
}

export default App;
