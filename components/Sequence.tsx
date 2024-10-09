import {
  PauseIcon,
  Play,
  PlayIcon,
  Square,
  SquareIcon,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Pressable,
} from "react-native";
export function Sequence() {
  const diamond = 10;
  return (
    <View style={styles.Sequence}>
      <SquareIcon color={"red"} size={diamond} style={styles.diamond} />
      <SquareIcon color={"red"} size={diamond} style={styles.diamond} />
      <SquareIcon color={"red"} size={diamond} style={styles.diamond} />
      <SquareIcon color={"red"} size={diamond} style={styles.diamond} />
    </View>
  );
}
const styles = StyleSheet.create({
  diamond: {
    transform: [{ rotate: "45deg" }],
    borderWidth: 9,
  },
  Sequence: {
    minWidth: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
});
