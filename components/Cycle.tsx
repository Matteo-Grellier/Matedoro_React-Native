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
import React, { useEffect, useState } from "react";
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

type CycleProps = {
	numberOfCycle: number;
	state: PomodoroState;
};

export function Cycle(props: CycleProps) {
	useEffect(() => {
		console.log("cycles " + props.numberOfCycle);
	}, [props.numberOfCycle]);
	let listOfCycle = [];
	for (let i = 0; i < 4; i++) {
		listOfCycle.push(
			<DiamondIcon
				key={i}
				color={"red"}
				size={10}
				style={
					(props.state = PomodoroState.FOCUS || PomodoroState.PAUSE)
						? styles.square
						: props.numberOfCycle >= i
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
							(props.state =
								PomodoroState.FOCUS || PomodoroState.PAUSE) &&
							props.numberOfCycle > key
								? "red"
								: (props.state =
											PomodoroState.FOCUS ||
											PomodoroState.PAUSE) &&
									  props.numberOfCycle == key
									? "black"
									: "white"
						}
						style={
							(props.state =
								PomodoroState.FOCUS || PomodoroState.PAUSE) &&
							props.numberOfCycle > key
								? styles.fullDiamond
								: key <= props.numberOfCycle
									? styles.square
									: props.numberOfCycle == key
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
