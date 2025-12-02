import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    currentLocation: null,
    searchedCities: null,
    onCitySearch: () => { },
    onDeleteCity: () => { },
    onTempSelect: () => { },
    onLangSelect: () => { },
    onLocationSelect: () => { },
    loadCities: () => { }
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
    const [currentLocation, setCurrentLocation] = useState(null);
    const [searchedCities, setSearchedCities] = useState(null);


    const onLangSelect = (e) => { setLang(e) };
    const onTempSelect = (e) => { setTemp(e) };
    const onLocationSelect = (e) => { setCurrentLocation(e) }
    const onCitySearch = (e) => {
        if (!searchedCities.find((loc) => loc.city === e.city)) {
            setSearchedCities((cities) => {
                AsyncStorage.setItem('cities', JSON.stringify([...cities, e]));
                return [...cities, e]
            });
        }
    }

    const onDeleteCity = (e) => {
        setSearchedCities(cities => {
            const updatedCities = cities.filter(loc => loc.city !== e.city);
            AsyncStorage.setItem('cities', JSON.stringify(updatedCities));
            return updatedCities
        });
    }

    const loadCities = (e) => setSearchedCities([...e]);

    return <WeatherContext.Provider value={{ currentLocation, lang, temp, searchedCities, onLangSelect, onTempSelect, onCitySearch, onDeleteCity, onLocationSelect, loadCities }}>{children}</WeatherContext.Provider>
};

export default WeatherContextProvider;