import { createContext, useEffect, useState } from "react";
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
    searchedCities: [],
    onCitySearch: () => { },
    onDeleteCity: () => { },
    onTempSelect: () => { },
    onLangSelect: () => { },
    onLocationSelect: () => { }
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
    const [searchedCities, setSearchedCities] = useState([]);

    useEffect(() => {
        const getSavedCities = async () => {
            const stored = await AsyncStorage.getItem('cities');
            const parsed = stored ? JSON.parse(stored) : [];
            setSearchedCities(parsed)
        }

        getSavedCities();
    }, [])

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

    return <WeatherContext.Provider value={{ currentLocation, lang, temp, searchedCities, onLangSelect, onTempSelect, onCitySearch, onDeleteCity, onLocationSelect }}>{children}</WeatherContext.Provider>
};

export default WeatherContextProvider;