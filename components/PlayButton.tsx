import { PomodoroContext } from "@/providers/PomodoroProvider";
import { PauseIcon, PlayIcon } from "lucide-react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
	StyleSheet, Pressable
} from "react-native";

export default function () {
	const { startTimer, stopTimer, isRunning, isSessionEnded, setIsRunning } = useContext(PomodoroContext);

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
				<PauseIcon size={40} color={"black"} />
			) : (
				<PlayIcon size={40} color={"black"} />
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
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
