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
    searchedCities: [],
    onCitySearch: () => { },
    onTempSelect: () => { },
    onLangSelect: () => { },
    onSelectLocation: () => { }
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

    const onSelectLocation = (e) => {
        setCurrentLocation(e)
    };
    const onLangSelect = (e) => { setLang(e) };
    const onTempSelect = (e) => { setTemp(e) };
    const onCitySearch = (e) => { setSearchedCities((cities) => [...cities, e]) }

    return <WeatherContext.Provider value={{ currentLocation, lang, temp, searchedCities, onLangSelect, onTempSelect, onCitySearch, onSelectLocation }}>{children}</WeatherContext.Provider>
};

export default WeatherContextProvider;