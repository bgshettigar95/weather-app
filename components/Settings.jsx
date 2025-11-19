import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { WeatherContext } from "../context/weather-context";

const Settings = () => {
  const { lang, temp } = useContext(WeatherContext);

  return (
    <View>
      <Text style={styles.title}>Settings</Text>
      <Pressable
        style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      >
        <Text style={styles.settingItemLabel}>Language</Text>
        <Text style={styles.settingItmeValue}>{lang.displayName}</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      >
        <Text style={styles.settingItemLabel}>Temperature</Text>
        <Text style={styles.settingItmeValue}>{temp.displayName}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingLeft: 20,
  },

  item: {
    marginBottom: 20,
    paddingLeft: 20,
  },

  pressed: {
    backgroundColor: "lightgrey",
  },

  settingItemLabel: {
    fontSize: 18,
    fontWeight: 500,
    marginVertical: 4,
  },

  settingItmeValue: {
    color: "gray",
    fontSize: 16,
  },
});

export default Settings;
