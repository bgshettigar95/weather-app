import React, { useContext } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { WeatherContext } from "../context/weather-context";
import { capitalize } from "../utils";

const DailyForecastScreen = ({ dailyData }) => {
  const { temp } = useContext(WeatherContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast</Text>
      <ScrollView>
        {dailyData.map((day, index) => (
          <View key={index} style={styles.dailyData}>
            <View>
              <Text style={styles.weekday}>
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </Text>
              <Text style={styles.date}>
                {new Date(day.dt * 1000).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.weatherCondition}>
              <Image
                style={styles.image}
                source={{
                  uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`,
                }}
              />
              <Text style={styles.description}>
                {capitalize(day.weather[0].description)}
              </Text>
            </View>

            <View style={styles.temperatureContainer}>
              <Text style={styles.temperature}>
                {Math.round(day.main.temp)}
                {temp.name}
              </Text>
              <Text style={styles.temperatureFeels}>
                Feels like {Math.round(day.main.feels_like)} {temp.name}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: { fontSize: 20, fontWeight: "600", color: "white" },
  dailyData: {
    margin: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(144, 138, 138, 0.45)",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  weekday: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  date: {
    color: "white",
    fontSize: 12,
  },

  temperatureContainer: {
    justifyContent: "center",
  },
  temperature: {
    color: "white",
    fontWeight: 800,
    fontSize: 26,
  },
  temperatureFeels: {
    color: "white",
    fontSize: 12,
  },
  description: {
    color: "white",
    fontSize: 10,
    position: "absolute",
    top: 10,
  },
  image: {
    width: 50,
    height: 50,
    position: "absolute",
    top: -30,
  },
  weatherCondition: {
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
});

export default DailyForecastScreen;
