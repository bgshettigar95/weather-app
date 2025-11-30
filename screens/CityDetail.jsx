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

  return <WeatherInfo location={city} />;
};

export default CityDetail;
