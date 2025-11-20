import React, { useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { WeatherContext } from "../context/weather-context";
import SettingsOption from "./SettingsOption";
import temperatureOptions from "../data/temperature";
import languageOptions from "../data/language";

const Settings = () => {
  const { lang, temp, onLangSelect, onTempSelect } = useContext(WeatherContext);
  const [isModalOpen, setISModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    options: [],
    selectedValue: null,
  });
  const [modalContext, setModalContext] = useState("");

  const displayModal = (context) => {
    setISModalOpen(true);
    setModalContext(context);

    if (context === "temp") {
      setModalConfig({
        title: "Temperature",
        options: temperatureOptions,
        selectedValue: temp,
      });
    } else {
      setModalConfig({
        title: "Language",
        options: languageOptions,
        selectedValue: lang,
      });
    }
  };

  const onSelect = (e) => {
    if (modalContext === "temp") {
      onTempSelect(e);
    } else {
      onLangSelect(e);
    }

    setTimeout(onCancel, 500);
  };

  const onCancel = () => {
    setISModalOpen(false);
    setModalConfig(null);
    setModalContext("");
  };

  // const onTemperatureSelect = (e) => {
  //   setISModalOpen(true);
  //   console.log(e);
  // };

  // const onLanguageSelect = (e) => {
  //   console.log(e);
  // };

  return (
    <View>
      <Text style={styles.title}>Settings</Text>
      <Pressable
        style={({ pressed }) => [styles.item, pressed && styles.pressed]}
        onPress={() => displayModal("lang")}
      >
        <Text style={styles.settingItemLabel}>Language</Text>
        <Text style={styles.settingItmeValue}>{lang.displayName}</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.item, pressed && styles.pressed]}
        onPress={() => displayModal("temp")}
      >
        <Text style={styles.settingItemLabel}>Temperature</Text>
        <Text style={styles.settingItmeValue}>{temp.displayName}</Text>
      </Pressable>

      <Modal visible={isModalOpen} animationType="slide">
        <SettingsOption
          {...modalConfig}
          onCancel={onCancel}
          onSelect={onSelect}
        />
      </Modal>
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
