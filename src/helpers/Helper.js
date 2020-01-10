const floorDayDegree = (dayObject) => {
    if (dayObject.min < 0) {
        dayObject.min = (-1 * Math.round(Math.abs(dayObject.min)));
    } else {
        dayObject.min = Math.round(dayObject.min);
    }
    if (dayObject.min === 0) {
        dayObject.min = Math.abs(dayObject.min)
    }
    if (dayObject.max < 0) {
        dayObject.max = (-1 * Math.round(Math.abs(dayObject.max)));
    } else {
        dayObject.max = Math.round(dayObject.max);
    }

    if (dayObject.max === 0) {
        dayObject.max = Math.abs(dayObject.max)
    }
}

const daysListToAverageObjects = (daySpecificList) => {

    let result = [];
    let temporaryDayObject = {
        name: undefined,
        min: undefined,
        max: undefined,
        typeList: [],
        symbolSpecifierList: []

    };

    for (let i = 0; i < daySpecificList.length; i++) {
        for (let j = 0; j < daySpecificList[i].length; j++) {
            let dayObject = daySpecificList[i][j];
            temporaryDayObject.symbolSpecifierList.push(dayObject.weather[0].icon);
            temporaryDayObject.name = timeStampConverterToDay(dayObject.dt);
            temporaryDayObject.typeList.push(dayObject.weather[0].main);
            if (dayObject.main.temp_min < temporaryDayObject.min || temporaryDayObject.min === undefined) {
                temporaryDayObject.min = dayObject.main.temp_min;
            } else if (dayObject.main.temp_max > temporaryDayObject.max || temporaryDayObject.max === undefined) {
                temporaryDayObject.max = dayObject.main.temp_max;
            }

        }

        floorDayDegree(temporaryDayObject);
        result.push(temporaryDayObject);
        temporaryDayObject = {
            name: undefined,
            min: undefined,
            max: undefined,
            typeList: [],
            symbolSpecifierList: []
        }
    }

    return result;
}

const getAverageForecastFromQuery = (weatherList) => {

    // This algorith slices the incoming array to a new, day specific array (array in array).
    let firstResultList = [];
    for (let i = (weatherList.length - 1); i >= 0; i--) {
        console.log(weatherList[i]);
        if (firstResultList.length === 0) {
            firstResultList[0] = [];
            firstResultList[0].push(weatherList.pop())
            continue;
        } else {
            for (let j = 0; j < firstResultList.length; j++) {
                if (timeStampConverterToDay(firstResultList[j][0].dt) === timeStampConverterToDay(weatherList[i].dt)) {
                    firstResultList[j].push(weatherList.pop())
                    break;
                }
                if (j + 1 === firstResultList.length) {
                    firstResultList.push([weatherList.pop()]);
                    i--;
                }
            }
        }

    }

    //Call this method to create day specific, average objects
    let secondResultList = daysListToAverageObjects(firstResultList);
    secondResultList.pop();
    secondResultList.reverse();
    console.log(secondResultList);
    return secondResultList;
}

const timeStampConverterToDay = (timeStamp) => {
    const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let date = new Date(timeStamp * 1000);
    date.setHours(date.getHours() - 1);
    return dayArray[date.getDay()];

}

const findHighestOccouranceString = (sourceArray) => {
    if (sourceArray.length === 0)
        return null;

    var modeMap = {},
        maxEl = sourceArray[0],
        maxCount = 1;

    for(var i = 0; i < sourceArray.length; i++)
    {
        var el = sourceArray[i];

        if (modeMap[el] === null)
            modeMap[el] = 1;
        else
            modeMap[el]++;

        if (modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
        else if (modeMap[el] === maxCount)
        {
            maxEl += '&' + el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

export { getAverageForecastFromQuery, timeStampConverterToDay, findHighestOccouranceString };