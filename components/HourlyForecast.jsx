import React, { useContext } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { WeatherContext } from "../context/weather-context";

const HourlyForecastScreen = ({ hourlyData }) => {
  const { temp } = useContext(WeatherContext);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Hourly Forecast</Text>
      {hourlyData.map((hour, index) => (
        <View key={index} style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 18 }}>
            {new Date(hour.dt * 1000).toLocaleTimeString()} - {hour.main.temp}{" "}
            {temp.name}
          </Text>
          <Image
            style={{ width: 50, height: 50 }}
            source={{
              uri: `http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`,
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default HourlyForecastScreen;
