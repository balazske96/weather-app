import React, { useState, useEffect } from 'react';
import Day from './Day';
import axios from 'axios';

export default function DaysContainer(props) {
    const [days, setDays] = useState([]);

    const timeStampConverterToDay = (timeStamp) => {
        const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let date = new Date(timeStamp * 1000);
        date.setHours(date.getHours() - 1);
        return dayArray[date.getDay()];

    }

    useEffect(() => {
        axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Budapest,hu&units=metric&APPID=f20aa9b471478b0c833a2bea588f7a05')
            .then(res => {
                let result = []
                let counter = 0;
                for (let i = 7; counter < 5; i += 8) {
                    console.log(res.data.list[i])
                    let day = {
                        type: res.data.list[i].weather[0].icon,
                        min: Math.floor(res.data.list[i].main.temp_min),
                        max:  Math.floor(res.data.list[i].main.temp_max),
                        name: timeStampConverterToDay(res.data.list[i].dt)
                    }
                    result.push(day);
                    counter++;
                }
                setDays(result)

            })
    }, [])

    return (
        <React.Fragment>
            {
                days.map(day => {
                    return <Day
                        name={day.name}
                        min={day.min}
                        max={day.max}
                        type={day.type}></Day>
                })
            }
        </React.Fragment>
    );
}