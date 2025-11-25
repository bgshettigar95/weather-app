import React, { useContext } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { WeatherContext } from "../context/weather-context";

const HourlyForecastScreen = ({ hourlyData }) => {
  const { temp } = useContext(WeatherContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hourly Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hourlyData.map((hour, index) => (
          <View key={index} style={styles.hourlyData}>
            <Text style={styles.time}>
              {new Date(hour.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Text style={styles.temperature}>
              {hour.main.temp}
              {temp.name}
            </Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: `http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`,
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title: { fontSize: 20, fontWeight: "600", color: "white" },
  hourlyData: {
    marginVertical: 20,
    marginHorizontal: 4,
    padding: 10,
    backgroundColor: "rgba(144, 138, 138, 0.45)",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    fontSize: 18,
    color: "white",
    fontWeight: 600,
    marginBottom: 4,
  },
  temperature: {
    color: "white",
  },
});

export default HourlyForecastScreen;
