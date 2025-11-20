import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RadioButtonGroup from "./RadioButtonGroup";

const SettingsOption = ({
  title,
  options,
  selectedValue,
  onCancel,
  onSelect,
}) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        <RadioButtonGroup
          selectedValue={selectedValue}
          options={options}
          onSelection={onSelect}
        />
        <Pressable onPress={onCancel} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 22, fontWeight: "600", marginBottom: 20 },
  closeButton: {
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  closeButtonText: { color: "#007bff", fontSize: 20, fontWeight: "600" },
});

export default SettingsOption;
