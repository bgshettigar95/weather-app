import React from "react";
import WeatherInfo from "../components/WeatherInfo";

const CityDetail = ({ route }) => {
  const city = route.params.city;
  return <WeatherInfo location={{ lat: city.lat, lon: city.lon }} />;
};

export default CityDetail;
