import React, { useState, useEffect } from 'react';
import './Day.css';
import SUN from './../weather_logos/sun.png';
import STORM from './../weather_logos/storm.png';
import SNOW from './../weather_logos/snow.png';
import SNOW_1 from './../weather_logos/snow-1.png';
import RAIN from './../weather_logos/rain.png';
import RAIN_1 from './../weather_logos/rain-1.png';
import RAIN_2 from './../weather_logos/rain-2.png';
import RAIN_3 from './../weather_logos/rain-3.png';
import MOON from './../weather_logos/moon.png';
import CLOUD from './../weather_logos/cloud.png';
import CLOUD_1 from './../weather_logos/cloud-1.png';
import CLOUD_2 from './../weather_logos/cloud-2.png';

export default function Day(props) {

    const [minimumDegree, setMinimumDegree] = useState(0);
    const [maximumDegree, setMaximumDegree] = useState(50)
    const [weatherPicturePath, setWeatherPicturePath] = useState(SUN);
    const [dayName, setDayName] = useState('default');

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

    useEffect(() => {
        setMaximumDegree(props.max);
        setMinimumDegree(props.min);
        setDayName(props.name);
        setWeatherPicturePath(setPathByWeatherCode(props.type))
    }, [])

    return (
        <div className='day-component'>
            <img src={weatherPicturePath} alt="Weather Symbol" className="weather-symbol"></img>
            <div className='day-name-container'>
                <p>{dayName}</p>
            </div>
            <div className='day-degree-part'>
                <p className='day-degree-value'>{minimumDegree}</p>
                <p className='day-degree-value'>/</p>
                <p className='day-degree-value'>{maximumDegree}</p>
            </div>
        </div>
    );
}