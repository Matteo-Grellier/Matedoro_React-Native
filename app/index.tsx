import { Text, View } from "react-native";
import { Pomodoro } from "@/components/Pomodoro";
import { PlayButton } from "@/components/PlayButton";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pomodoro />
      <PlayButton />
    </View>
  );
}
