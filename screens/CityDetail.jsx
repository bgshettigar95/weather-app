import React, { useLayoutEffect } from "react";
import WeatherInfo from "../components/WeatherInfo";

const CityDetail = ({ route, navigation }) => {
  const city = route.params.city;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTintColor: "white",
    });
  }, []);

  return <WeatherInfo location={{ lat: city.lat, lon: city.lon }} />;
};

export default CityDetail;
