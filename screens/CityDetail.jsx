import React, { useLayoutEffect } from "react";
import WeatherInfo from "../components/WeatherInfo";

const CityDetail = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.city.name,
      headerTintColor: "white",
    });
  }, []);
  const city = route.params.city;
  return <WeatherInfo location={{ lat: city.lat, lon: city.lon }} />;
};

export default CityDetail;
