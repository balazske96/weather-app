import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import DaysContainer from './components/DaysContainter';
import PresentWeather from './components/PresentWeather';
import CreditentialsFooter from './components/CreditentialsFooter';
import CreditentialsComponent from './components/CreditentialsComponent';
import RAINY from './backgrounds/RAINY.jpg';
import SUNNY from './backgrounds/SUNNY.jpg';
import CLOUDY from './backgrounds/CLOUDY.jpg';
import axios from 'axios';

function App() {


  // This function is just a helper function to avoid react http's problem
  if (window.location.protocol === 'https:') {
    window.location.href = 'https://venyige-weather.herokuapp.com';
    window.location.reload();
  }
  //Function ends (delete later)

  setInterval(() => {
    window.location.reload();
  }, 30000)


  useEffect(() => {
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=Budapest,hu&units=metric&APPID=f20aa9b471478b0c833a2bea588f7a05')
      .then(res => {
        if (res.data.weather[0].main === 'Clear') {
          document.body.style.backgroundImage = `url(${SUNNY})`;
          document.body.style.backgroundSize = 'cover';
        }
        else if (res.data.weather[0].main === 'Clouds' || res.data.weather[0].main === 'Mist') {
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
    <BrowserRouter>
      <Route path='/' exact render={() => 
        <div className='weather-components-container' >
          <PresentWeather></PresentWeather>
          <div className='five-day-forecast-title corner'>5 day forecast</div>
          <DaysContainer></DaysContainer>
          <CreditentialsFooter></CreditentialsFooter>
        </div >
      }/>

      <Route path='/creditentials' exact component={CreditentialsComponent}/>
    </BrowserRouter>
  );
}

export default App;
