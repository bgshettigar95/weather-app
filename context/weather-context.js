import { createContext, useState } from "react";

export const WeatherContext = createContext({
    lang: {
        name: 'en',
        displayName: "English"
    },
    temp: {
        tempUnit: 'metric',
        name: '°C',
        displayName: 'Celsius °C'
    },
    currentLocation: '',
    searchedCities: []

});

const WeatherContextProvider = ({ children }) => {
    const [currentLocation, setCurrentLocation] = useState('');
    const [lang, setLang] = useState({
        name: 'en',
        displayName: "English"
    });
    const [temp, setTemp] = useState({
        tempUnit: 'metric',
        name: '°C',
        displayName: 'Celsius °C'
    });
    const [searchedCities, setSearchedCities] = useState([]);

    return <WeatherContext.Provider value={{ currentLocation, lang, temp, searchedCities }}>{children}</WeatherContext.Provider>
};

export default WeatherContextProvider;