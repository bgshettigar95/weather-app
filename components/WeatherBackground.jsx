import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { weatherBackgrounds } from "../data/weather-background";

const WeatherBackground = ({ children, currentWeather }) => {
  const weatherCondition = currentWeather?.weather?.[0]?.main || "Clear"; // e.g., Clear, Clouds

  const now = currentWeather.dt; // current time (UTC)
  const sunrise = currentWeather.sys.sunrise;
  const sunset = currentWeather.sys.sunset;

  const isDay = now >= sunrise && now <= sunset;

  const backgroundImage =
    weatherBackgrounds[weatherCondition]?.[isDay ? "day" : "night"] ||
    weatherBackgrounds["Clear"].day;

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default WeatherBackground;
