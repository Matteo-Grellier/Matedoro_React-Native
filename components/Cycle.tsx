import { PomodoroContext } from "@/providers/PomodoroProvider";
import {
	DiamondIcon,
	Fullscreen,
	LucideEye,
	PauseIcon,
	Play,
	PlayIcon,
	Square,
	SquareIcon,
} from "lucide-react-native";
import React, { useContext, useEffect, useState } from "react";
import {
	StyleSheet,
	Button,
	View,
	SafeAreaView,
	Text,
	Alert,
	Pressable,
} from "react-native";

enum PomodoroState {
	FOCUS,
	PAUSE,
	NONE,
}



export function Cycle() {
	const { cycleNumber, pomodoroState } = useContext(PomodoroContext);

	let listOfCycle = [];
	for (let i = 0; i < 4; i++) {
		listOfCycle.push(
			<DiamondIcon
				key={i}
				color={"red"}
				size={10}
				style={
					(pomodoroState == PomodoroState.FOCUS || PomodoroState.PAUSE)
						? styles.square
						: cycleNumber >= i
							? styles.fullDiamond
							: styles.diamond
				}
			/>,
		);
	}

	return (
		<View style={styles.Sequence}>
			{/* {listOfCycle} */}
			{Array(4)
				.fill(null)
				.map((_, key) => (
					<DiamondIcon
						key={key}
						color={"red"}
						size={10}
						fill={
							(pomodoroState ==
								PomodoroState.FOCUS || PomodoroState.PAUSE) &&
								cycleNumber > key
								? "red"
								: (pomodoroState ==
									PomodoroState.FOCUS ||
									PomodoroState.PAUSE) &&
									cycleNumber == key
									? "black"
									: "white"
						}
						style={
							(pomodoroState ==
								PomodoroState.FOCUS || PomodoroState.PAUSE) &&
								cycleNumber > key
								? styles.fullDiamond
								: key <= cycleNumber
									? styles.square
									: cycleNumber == key
										? styles.square
										: styles.diamond
						}
					/>
				))}
		</View>
	);
}
const styles = StyleSheet.create({
	diamond: {
		borderWidth: 9,
	},
	fullDiamond: {
		borderWidth: 9,
	},
	square: {
		borderWidth: 9,
		transform: [{ rotate: "45deg" }],
	},
	Sequence: {
		minWidth: 150,
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginBottom: 50,
	},
});
