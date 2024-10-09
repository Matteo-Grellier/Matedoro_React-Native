import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { PlayButton } from "./PlayButton";
import { Sequence } from "./Sequence";
import { Timer } from "./Timer";

export function Pomodoro() {
  return (
    <View>
      <Timer />
      <Sequence />
    </View>
  );
}
const styles = StyleSheet.create({
  Timer: { paddingBottom: 50 }, // A TERMINER
});
