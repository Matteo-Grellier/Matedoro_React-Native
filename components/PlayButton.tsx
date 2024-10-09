import { PauseIcon, Play, PlayIcon } from "lucide-react-native";
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

export function PlayButton() {
  const [isClicked, setIsClicked] = useState(true);
  function changeButton() {
    setIsClicked(!isClicked);
  }
  return (
    <Pressable style={styles.Button} onPress={changeButton}>
      {isClicked ? (
        <PlayIcon size={40} color={"black"} style={styles.Icon} />
      ) : (
        <PauseIcon size={40} color={"black"} style={styles.Icon} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Button: {
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 2,
    width: 100,
    height: 100,
  },
  Icon: { marginLeft: 28, marginTop: 28 },
});
