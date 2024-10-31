import { useTimer } from "@/hooks/useTimer";
import { EyeIcon, FeatherIcon, FileX } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

type TUseTimer = {
	minutes: string;
	seconds: string;
};

enum PomodoroState {
	FOCUS,
	PAUSE,
	NONE,
}

type TimerProps = {
	buttonClickState: boolean;
	timer: TUseTimer;
	pomodoroState: PomodoroState;
};

export function Timer(props: TimerProps) {
	return (
		<View style={styles.circleDot}>
			{props.pomodoroState == PomodoroState.PAUSE ? (
				<FeatherIcon
					size={35}
					color={"black"}
					style={styles.feather}
				></FeatherIcon>
			) : (
				<EyeIcon
					size={35}
					color={"black"}
					style={styles.feather}
				></EyeIcon>
			)}

			<Text style={styles.TextTimer}>
				{props.timer.minutes}:{props.timer.seconds}
			</Text>
			{props.pomodoroState == PomodoroState.FOCUS ? (
				<Text style={styles.stateText}>F O C U S</Text>
			) : (
				<Text style={styles.stateText}>B R E A K</Text>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	circleDot: {
		borderWidth: 2,
		borderStyle: "dashed",
		borderRadius: 200,
		width: 250,
		height: 250,
		marginBottom: 50,
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
	},
	TextTimer: {
		fontSize: 50,
	},
	feather: {
		width: 100,
		height: 100,
		borderColor: "black",
		borderRadius: 15,
		marginTop: 20,
		borderWidth: 2,
	},
	stateText: {
		fontSize: 20,
		marginBottom: 20,
	},
});
