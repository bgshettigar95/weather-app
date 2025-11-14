import React, { useState } from "react";
import { Text, View } from "react-native";

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
