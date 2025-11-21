import React, { useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import { Alert, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import HourlyForecastScreen from "./HourlyForecast";
import DailyForecastScreen from "./DailyForecast";
import { WeatherContext } from "../context/weather-context";

const { API_KEY } = Constants.expoConfig.extra;
const API_URL = "https://api.openweathermap.org/data/2.5/forecast";

const WeatherForecast = ({ location }) => {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang, temp } = useContext(WeatherContext);

  const getWeatherForecast = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${temp.tempUnit}&lang=${lang.name}`;
      const response = await axios.get(url);
      setWeatherForecast(response.data);
    } catch (error) {
      Alert.alert("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getHourlyForecast = () => weatherForecast.list.slice(0, 8);

  const getDailyForecast = () => {
    return weatherForecast.list.filter((_, i) => i % 8 === 0);
  };

  useEffect(() => {
    getWeatherForecast();
  }, [lang.name, temp.name]);

  if (loading) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <ScrollView>
      <HourlyForecastScreen hourlyData={getHourlyForecast()} />
      <DailyForecastScreen dailyData={getDailyForecast()} />
    </ScrollView>
  );
};

export default WeatherForecast;

const styles = StyleSheet.create({});
