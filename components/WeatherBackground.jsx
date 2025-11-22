import React, { useContext } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { weatherBackgrounds } from "../data/weather-background";

const WeatherBackground = ({ children, currentWeather }) => {
  const weatherCondition = currentWeather?.weather?.[0]?.main || "Clear"; // e.g., Clear, Clouds
  const currentTime = new Date().getHours();
  const isDay = currentTime >= 6 && currentTime < 18;
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
  },
});

export default WeatherBackground;
