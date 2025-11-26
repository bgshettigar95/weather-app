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

    const onLangSelect = (e) => { setLang(e) };
    const onTempSelect = (e) => { setTemp(e) };
    const onCitySearch = (e) => {
        if (!searchedCities.find((city) => city.name === e.name)) {
            setSearchedCities((cities) => [...cities, e])
        }
    }

    return <WeatherContext.Provider value={{ lang, temp, searchedCities, onLangSelect, onTempSelect, onCitySearch }}>{children}</WeatherContext.Provider>
};

export default WeatherContextProvider;