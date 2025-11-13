import React, { useState } from "react";
import { Text, View } from "react-native";

const APIKEY = "7fa59d6a055c5d953120574f9dc2b940";

const CityDetail = ({ city }) => {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  return (
    <View>
      <Text>CityDetail</Text>
    </View>
  );
};

export default CityDetail;
