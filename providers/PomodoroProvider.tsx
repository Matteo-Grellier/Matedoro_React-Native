import { TUseTimer, useTimer } from "@/hooks/useTimer";
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';
import { Platform, Vibration } from "react-native";
import { Audio } from 'expo-av';


type CompletedSession = {
	workTime: string;
	sessions: number;
	date: string;
};


type PomodoroProviderState = {
	isFocus: boolean
	timeLeft: TUseTimer
	isRunning: boolean
	cycleNumber: number
	pomodoroState: PomodoroState,
	createNewSession: (cycleFocusTime: number, cyclePausesTime: number) => void;
	setIsLong: (isLong: boolean) => void;
	startTimer: () => void;
	stopTimer: () => void;
	setTimeLeft: (time: number) => void;
	endSession: () => void;
	completedSessions: CompletedSession[]; // Array
};

// Appeler useTimer + un tableau de cycle [0,WORK or BREAK]
enum PomodoroState {
	FOCUS,
	PAUSE,
	NONE,
}

enum cycleType {
	LONG,
	SHORT
}

const initialState: PomodoroProviderState = {
	isFocus: true,
	timeLeft: { minutes: "25", seconds: "00" },
	isRunning: false,
	cycleNumber: 0,
	pomodoroState: PomodoroState.FOCUS,
	createNewSession: (cycleFocusTime: number, cyclePausesTime: number) => { },
	setIsLong: (isLong: boolean) => { },
	startTimer: () => { },
	stopTimer: () => { },
	setTimeLeft: (timer: number) => { },
	endSession: () => { },
	completedSessions: []
}

export const PomodoroContext = createContext<PomodoroProviderState>(initialState);

type PomodoroProviderProps = {
	children: ReactNode;
};

// Configure les paramètres de notification
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
})


export const PomodoroProvider = ({ children }: PomodoroProviderProps) => {
	const [isRunning, setIsRunning] = useState(false);
	const [isFocus, setIsFocus] = useState(true);
	const [cyclePauseTime, setCyclePauseTime] = useState(3000)
	const [cycleFocusTime, setCycleFocusTime] = useState(5000)
	const [cycleNumber, setCycleNumber] = useState(3);
	const [totalCycleNumber, setTotalCycleNumber] = useState(6);
	const [isLong, setIsLong] = useState(false);
	const [pomodoroState, setPomodoroState] = useState<PomodoroState>(
		PomodoroState.FOCUS,
	);
	const [completedSessions, setCompletedSessions] = useState<
		{ workTime: string; sessions: number; date: string }[]
	>([]);

	const customSound = require('/home/lanayr/Downloads/Matedoro_React-Native/assets/sounds/notification-sound-1-253323.mp3');

	const requestPermissions = async () => {
		const { status } = await Notifications.requestPermissionsAsync();
		if (status !== 'granted') {
			alert('Permission for notifications not granted. Please enable it in the settings.');
		}
	};

	useEffect(() => {
		requestPermissions();
	}, []);

	const playNotificationSound = async () => {
		try {
			const { sound } = await Audio.Sound.createAsync(customSound);
			await sound.playAsync();
		} catch (error) {
			console.error('Erreur lors de la lecture du son de notification', error);
		}
	};

	const sendNotification = async (title: string, body: string) => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title,
				body,
			},
			trigger: null, // Déclenche immédiatement la notification
		});
	};

	const totalWorkTime = () => {
		// Total focus time in minutes: multiply cycle time by total number of cycles (in milliseconds)
		const totalFocusMinutes = Math.floor((cycleFocusTime / 1000 / 60) * totalCycleNumber);
		console.log("ttcn" + (cycleFocusTime / 1000 / 60));
		console.log("focustime" + cycleFocusTime);
		// Convert total focus minutes to hours and remaining minutes
		const totalHours = Math.floor(totalFocusMinutes / 60);
		const remainingMinutes = totalFocusMinutes % 60;

		// Format result as "Xh Ym"
		return `${totalHours}h ${remainingMinutes}m`;
	};


	const createNewSession = (cycleFocusTime: number, cyclePausesTime: number) => {
		// Reset all the states to start a new Pomodoro session.
		setPomodoroState(PomodoroState.FOCUS);
		setIsFocus(true);
		setCycleNumber(0); // Reset cycle count to start from the first cycle.
		setCycleFocusTime(cycleFocusTime);
		setCyclePauseTime(cyclePauseTime);
		setTimeLeft(cycleFocusTime); // Set the initial focus time.
		setIsRunning(false); // Make sure the timer is not running until user starts it.
		sendNotification("New Pomodoro Session!", "A new Pomodoro session has started! Get ready to focus.");
		const currentDate = new Date().toLocaleDateString();
		const workTime = totalWorkTime(); // Replace with actual work time from your timer.
		const sessionsCount = totalCycleNumber;
		playNotificationSound();
		// Add the completed session to the state array.
		setCompletedSessions((prev) => [
			...prev,
			{ workTime, sessions: sessionsCount, date: currentDate },
		]);
		setTotalCycleNumber(0);
	};

	const endSession = () => {
		// Stop the timer and reset the states when ending the session.
		console.log("WT2")
		stopTimer();
		setIsRunning(false);
		setPomodoroState(PomodoroState.NONE); // Set the state to NONE to indicate no ongoing session.
		setTimeLeft(0); // Reset the timer display.
		sendNotification("Pomodoro Session Ended", "Great work! You have completed the Pomodoro session.");
		Vibration.vibrate(2000); // Give the user feedback that the session has ended.
	};

	const handleCycleNumber = () => {
		if (cycleNumber > 2) {
			setCycleNumber(0)
		} else {
			setTotalCycleNumber(totalCycleNumber + 1);
			setCycleNumber(cycleNumber + 1);
		}
	}

	const { setTimeLeft, startTimer, stopTimer, timeLeft, timerOver } = useTimer();

	const onTimerUpdate = useCallback(() => {
		if (isFocus) {
			setPomodoroState(PomodoroState.PAUSE);
			setIsFocus(false);
			setTimeLeft(cyclePauseTime);
			sendNotification("Pause Time!", "C'est le moment de prendre une pause !");
			playNotificationSound();
			Vibration.vibrate(2000)
		} else {
			setPomodoroState(PomodoroState.FOCUS);
			setIsFocus(true);
			setTimeLeft(cycleFocusTime);
			handleCycleNumber();
			sendNotification("Focus Time!", "C'est le moment de se concentrer !");
			playNotificationSound();
			Vibration.vibrate(2000)
		}
		startTimer();
	}, [isFocus, cyclePauseTime, cycleFocusTime, startTimer]);

	// Utiliser useEffect pour déclencher onTimerUpdate quand le timer est terminé
	useEffect(() => {
		if (timeLeft.minutes === "00" && timeLeft.seconds === "00") {
			onTimerUpdate();
		}
	}, [timeLeft, onTimerUpdate]);

	const changeCycleType = useCallback(() => {
	}, [isLong])

	return (
		<PomodoroContext.Provider
			value={{
				isFocus,
				timeLeft,
				isRunning,
				cycleNumber,
				startTimer,
				stopTimer,
				setTimeLeft,
				setIsLong,
				pomodoroState,
				createNewSession,
				endSession,
				completedSessions
			}}
		>
			{children}
		</PomodoroContext.Provider>
	);
}
