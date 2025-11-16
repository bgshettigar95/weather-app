import React from "react";
import { View } from "react-native";
import Icon from "@expo/vector-icons/Feather";

const WeatherIcon = ({ weatherType, icon, size = 60 }) => {
  const isDay = icon.includes("d") ? true : false;

  // Map weather conditions to icons based on day or night
  const weatherIconMap = {
    Clear: {
      day: "sun",
      night: "moon",
      color: isDay ? "#f1c40f" : "#aac7d2ff",
    },
    Clouds: { day: "cloud", night: "cloud", color: "#7f8c8d" },
    Rain: { day: "cloud-rain", night: "cloud-rain", color: "#3498db" },
    Drizzle: { day: "cloud-drizzle", night: "cloud-drizzle", color: "#5dade2" },
    Thunderstorm: {
      day: "cloud-lightning",
      night: "cloud-lightning",
      color: "#e74c3c",
    },
    Snow: { day: "cloud-snow", night: "cloud-snow", color: "#ecf0f1" },
    Mist: { day: "cloud", night: "cloud", color: "#95a5a6" },
    Fog: { day: "cloud", night: "cloud", color: "#95a5a6" },
    Haze: { day: "wind", night: "wind", color: "#95a5a6" },
    Smoke: { day: "wind", night: "wind", color: "#7f8c8d" },
    Dust: { day: "wind", night: "wind", color: "#d35400" },
    Sand: { day: "wind", night: "wind", color: "#d35400" },
    Ash: { day: "wind", night: "wind", color: "#7f8c8d" },
    Squall: { day: "wind", night: "wind", color: "#3498db" },
    Tornado: { day: "wind", night: "wind", color: "#e74c3c" },
  };

  const iconDetails = weatherIconMap[weatherType] || {
    day: "cloud",
    night: "cloud",
    color: "#7f8c8d",
  };
  const iconName = isDay ? iconDetails.day : iconDetails.night;

  return (
    <View>
      <Icon name={iconName} size={size} color={iconDetails.color} />
    </View>
  );
};
export default WeatherIcon;
