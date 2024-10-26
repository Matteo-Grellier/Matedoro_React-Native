import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Cycle } from "./Cycle";
import { Timer } from "./Timer";
import { useTimer } from "@/hooks/useTimer";
import { PomodoroContext } from "@/providers/PomodoroProvider";

let breakTime = 3000;
let workTime = 5000;

function SetBreakAndFocus(bT: number, wT: number) {
	breakTime = bT;
	workTime = wT;
}

type pomodoroProps = {
	onClick: boolean;
};

type TUseTimer = {
	minutes: string;
	seconds: string;
};



export function Pomodoro(props: pomodoroProps) {
	const { cycleNumber, timeLeft, pomodoroState } = useContext(PomodoroContext);

	return (
		<View>
			<Timer
				buttonClickState={props.onClick}
				timer={timeLeft}
				pomodoroState={pomodoroState}
			/>
			<Cycle />
		</View>
	);
}

const styles = StyleSheet.create({
	Timer: { paddingBottom: 50 }, // A TERMINER
});
