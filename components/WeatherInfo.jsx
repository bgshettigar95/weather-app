import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import { capitalize } from "../utils";
import { WeatherContext } from "../context/weather-context";
import WeatherBackground from "./WeatherBackground";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

const { API_KEY } = Constants.expoConfig.extra;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherInfo = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang, temp } = useContext(WeatherContext);

  const getWeather = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${temp.tempUnit}&lang=${lang.name}`;
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      alert("City not found!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
    NavigationBar.setBackgroundColorAsync("#202020");
    NavigationBar.setButtonStyleAsync("light");
  }, [lang.name, temp.name]);

  if (loading) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <WeatherBackground currentWeather={weatherData}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.weatherInfo}>
          <Text style={styles.currentLocation}>
            {location.city}, {weatherData.sys.country}
          </Text>
          <Text style={styles.description}>
            {capitalize(weatherData.weather[0].description)}
          </Text>

          <View style={styles.weatherCondition}>
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
              }}
            />
            <Text style={styles.temperature}>
              {Math.round(weatherData.main.temp)}
              {temp.name}
            </Text>
          </View>
        </View>

        <View style={styles.metrics}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Feels like</Text>
            <Text style={styles.metricValue}>
              {weatherData.main.feels_like} {temp.name}
            </Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Humidity</Text>
            <Text style={styles.metricValue}>{weatherData.main.humidity}%</Text>
          </View>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Wind Speed</Text>
            <Text style={styles.metricValue}>{weatherData.wind.speed} m/s</Text>
          </View>
        </View>

        <WeatherForecast location={location} />
      </ScrollView>
    </WeatherBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 100,
    width: "100%",
  },

  weatherInfo: {
    alignItems: "center",
    width: "100%",
  },
  weatherCondition: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    width: "100%",
    justifyContent: "center",
  },
  currentLocation: {
    fontSize: 32,
    fontWeight: "600",
    color: "white",
  },
  description: {
    fontSize: 14,
    color: "white",
  },
  temperature: {
    fontSize: 80,
    fontWeight: "400",
    color: "white",
    marginLeft: 4,
  },
  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  metricItem: {
    justifyContent: "center",
    alignContent: "center",
  },
  metricLabel: {
    color: "white",
  },
  metricValue: {
    color: "white",
  },
});

export default WeatherInfo;
