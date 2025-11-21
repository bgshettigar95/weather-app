import React, { useContext } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { WeatherContext } from "../context/weather-context";

const DailyForecastScreen = ({ dailyData }) => {
  const { temp } = useContext(WeatherContext);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>5-Day Forecast</Text>
      {dailyData.map((day, index) => (
        <View key={index} style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 18 }}>
            {new Date(day.dt * 1000).toLocaleDateString()} - {day.main.temp}
            {temp.name}
          </Text>
          <Image
            style={{ width: 50, height: 50 }}
            source={{
              uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`,
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default DailyForecastScreen;
