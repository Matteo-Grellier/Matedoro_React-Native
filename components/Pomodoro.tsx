import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { PlayButton } from "./PlayButton";
import { Cycle } from "./Cycle";
import { Timer } from "./Timer";
import { useTimer } from "@/hooks/useTimer";

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

// Appeler useTimer + un tableau de cycle [0,WORK or BREAK]
enum PomodoroState {
	FOCUS,
	PAUSE,
	NONE,
}

export function Pomodoro(props: pomodoroProps) {
	const [numberOfCycles, setNumberOfCycles] = useState(3);
	//truc qui cloche ici
	const { timer, setTimer, time } = useTimer(5000, props.onClick);
	const [pomodoroState, setPomodoroState] = useState<PomodoroState>(
		PomodoroState.FOCUS,
	);

	useEffect(() => {
		console.log(numberOfCycles);
		if (numberOfCycles == 4) {
			console.log("ZFZFZ");
			setNumberOfCycles(0);
		}
		if (timer == 0 && pomodoroState == PomodoroState.FOCUS) {
			console.log("FOCUS");
			setTimer(5000);
			setPomodoroState(PomodoroState.PAUSE);
		} else if (timer == 0 && pomodoroState == PomodoroState.PAUSE) {
			console.log("PAUSE");
			setTimer(3000);
			setPomodoroState(PomodoroState.FOCUS);
			setNumberOfCycles(numberOfCycles + 1);
		}
	}, [timer]);

	return (
		<View>
			<Timer
				buttonClickState={props.onClick}
				timer={time}
				pomodoroState={pomodoroState}
			/>
			<Cycle numberOfCycle={numberOfCycles} state={pomodoroState} />
		</View>
	);
}

const styles = StyleSheet.create({
	Timer: { paddingBottom: 50 }, // A TERMINER
});
