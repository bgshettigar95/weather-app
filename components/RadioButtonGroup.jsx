import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const RadioButtonGroup = ({ selectedValue, options, onSelection }) => {
  return (
    <View>
      {options.map((option) => (
        <Pressable
          key={option.label}
          onPress={() => onSelection(option)}
          style={styles.radioContainer}
        >
          <View style={styles.radioOuterCircle}>
            {selectedValue.name === option.name && (
              <View style={styles.radioInnerCircle} />
            )}
          </View>
          <Text style={styles.radioLabel}>{option.displayName}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  /* RADIO BUTTON STYLES */
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioOuterCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#007bff",
  },
  radioLabel: { fontSize: 16 },
});

export default RadioButtonGroup;
