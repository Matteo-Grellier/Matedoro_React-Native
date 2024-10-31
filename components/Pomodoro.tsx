import React, { useContext } from "react";
import { View } from "react-native";
import { Cycle } from "./Cycle";
import { Timer } from "./Timer";
import { PomodoroContext } from "@/providers/PomodoroProvider";

let breakTime = 3000;
let workTime = 5000;


type pomodoroProps = {
	onClick: boolean;
};




export function Pomodoro(props: pomodoroProps) {
	const { timeLeft, pomodoroState } = useContext(PomodoroContext);

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
