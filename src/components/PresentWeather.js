import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import SUN from './../weather_logos/minimal_logos/015-sun.png';
import STORM from './../weather_logos/minimal_logos/027-cloud-12.png';
import SNOW_1 from './../weather_logos/minimal_logos/024-snow.png';
import RAIN_1 from './../weather_logos/minimal_logos/029-cloud-10.png';
import RAIN_3 from './../weather_logos/minimal_logos/036-cloud-3.png';
import MOON from './../weather_logos/minimal_logos/023-moon.png';
import CLOUD from './../weather_logos/minimal_logos/037-cloud-2.png';
import CLOUD_1 from './../weather_logos/minimal_logos/026-cloud-13.png';
import CLOUD_2 from './../weather_logos/minimal_logos/038-cloud-1.png';
import './PresentWeather.css';

export default function PresentWeather(props) {

    const [weatherPicturePath, setWeatherPicturePath] = useState(null);
    const [temperature, setTemperature] = useState(23);
    const [weatherType, setWeatherType] = useState('Clear');


    const setPathByWeatherCode = (code) => {
        switch (code) {
            case '02d':
                return CLOUD_2;
            case '02n':
                return CLOUD_2;
            case '03d':
                return CLOUD_1;
            case '03n':
                return CLOUD_1
            case '04d':
                return RAIN_1;
            case '04n':
                return RAIN_1;
            case '09d':
                return RAIN_3;
            case '10d':
                return RAIN_3;
            case '09n':
                return RAIN_3;
            case '10n':
                return RAIN_3;
            case '11d':
                return STORM;
            case '11n':
                return STORM;
            case '13d':
                return SNOW_1;
            case '13n':
                return SNOW_1;
            case '01n':
                return MOON;
            case '02n':
                return CLOUD;
            default:
                return SUN;
        }
    }

    const setWeatherPicture = (result) => {
        let code = result.data.weather[0].icon;
        setWeatherPicturePath(setPathByWeatherCode(code));
    }


    useEffect(() => {
        Axios.get('http://api.openweathermap.org/data/2.5/weather?q=Budapest,hu&units=metric&APPID=f20aa9b471478b0c833a2bea588f7a05')
            .then(result => {
                setWeatherPicture(result);
                if (result.data.main.temp < 0) {
                    setTemperature(-1 * Math.floor(Math.abs(result.data.main.temp)))
                } else {
                    setTemperature(Math.floor(result.data.main.temp))
                }
                setWeatherType(result.data.weather[0].main);
            })
    }, [])


    return (
        <div className='present-weather-component corner'>
            <div className="present-weather-symbol">
                <img src={weatherPicturePath} alt="Weather Symbol" style={{width: '100%'}}></img>
            </div>
            <div className='present-weather-type'>{weatherType}</div>
            <div className="present-weather-temperature">{temperature} °C</div>
        </div>
    )
}