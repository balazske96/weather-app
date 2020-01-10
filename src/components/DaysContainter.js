import React, { useState, useEffect } from 'react';
import Day from './Day';
import axios from 'axios';
import { getAverageForecastFromQuery, timeStampConverterToDay, findHighestOccouranceString } from './../helpers/Helper'

export default function DaysContainer(props) {
    const [days, setDays] = useState([]);

    useEffect(() => {
        axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Budapest,hu&units=metric&APPID=f20aa9b471478b0c833a2bea588f7a05')
            .then(res => {
                let cloneOfData = JSON.parse(JSON.stringify(res)); //deep clone the result object
                setDays(getAverageForecastFromQuery(cloneOfData.data.list));
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
                        type={findHighestOccouranceString(day.typeList)}
                        symbolSpecifier={findHighestOccouranceString(day.symbolSpecifierList)}></Day>
                })
            }
        </React.Fragment>
    );
}