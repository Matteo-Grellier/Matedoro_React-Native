import { PomodoroContext } from "@/providers/PomodoroProvider";
import { PauseIcon, PlayIcon } from "lucide-react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Pressable } from "react-native";

export default function () {
	const { startTimer, stopTimer, isRunning, isSessionEnded, setIsRunning } =
		useContext(PomodoroContext);

	const toggleButton = useCallback(() => {
		if (isRunning) {
			setIsRunning(false);
			stopTimer();
		} else {
			setIsRunning(true);
			startTimer();
		}
	}, [isRunning, startTimer, stopTimer]);

	return (
		<Pressable style={styles.Button} onPress={toggleButton}>
			{isRunning ? (
				<PauseIcon size={30} color={"black"} />
			) : (
				<PlayIcon size={30} color={"black"} />
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	Button: {
		alignItems: "center",
		justifyContent: "center",
		width: 70,
		height: 70,
		backgroundColor: "white",
		borderWidth: 2,
		borderRadius: 15,
		shadowColor: "black",
		shadowOpacity: 1,
		elevation: 5,
	},
});
