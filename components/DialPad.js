import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

const DialPad = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePress = (num) => {
    setPhoneNumber((prev) => prev + num);
  };

  const handleDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (phoneNumber.length > 0) {
      console.log(`Calling ${phoneNumber}...`);
      Linking.openURL(`tel:${phoneNumber}`); // call a number 
    }
  };

  return (
    <View style={styles.container}>
      {/* Number Display with Delete Button */}
      <View style={styles.numberContainer}>
        <Text style={styles.phoneNumber}>{phoneNumber || "Enter Number"}</Text>
        {phoneNumber.length > 0 && (
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Ionicons name="backspace" size={28} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {/* Dialpad Buttons */}
      <View style={styles.dialpad}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
          (num) => (
            <TouchableOpacity
              key={num}
              style={styles.button}
              onPress={() => handlePress(num)}
            >
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Call Button */}
      <TouchableOpacity onPress={handleCall} style={styles.callButton}>
        <Ionicons name="call" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "top",
    marginTop: 250,
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  numberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  phoneNumber: {
    fontSize: 28,
    fontWeight: "bold",
    flex: 1, 
    textAlign: "center",
  },
  deleteButton: {
    padding: 10,
  },
  dialpad: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  callButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default DialPad;
