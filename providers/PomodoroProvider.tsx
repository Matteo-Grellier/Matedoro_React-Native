import { TUseTimer, useTimer } from "@/hooks/useTimer";
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';
import { Platform, Vibration } from "react-native";
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CompletedSession = {
	workTime: string;
	sessions: number;
	date: Date;
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
	isSessionEnded: boolean;
	setIsRunning: (bool: boolean) => void;
};

enum PomodoroState {
	FOCUS,
	PAUSE,
	NONE,
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
	completedSessions: [],
	isSessionEnded: false,
	setIsRunning: (bool: boolean) => { }
}

enum cycleType {
	LONG,
	SHORT
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
	const [cyclePauseTime, setCyclePauseTime] = useState(150000)
	const [cycleFocusTime, setCycleFocusTime] = useState(30000)
	const [cycleNumber, setCycleNumber] = useState(0);
	const [totalCycleNumber, setTotalCycleNumber] = useState(0);
	const [isLong, setIsLong] = useState(false);
	const [isSessionEnded, setIsSessionEnded] = useState(false);
	const [pomodoroState, setPomodoroState] = useState<PomodoroState>(
		PomodoroState.FOCUS,
	);
	const [completedSessions, setCompletedSessions] = useState<
		{ workTime: string; sessions: number; date: Date }[]
	>([]);
	const [totalWorkMinutes, setTotalWorkMinutes] = useState(0); // Track total


	const customSound = require('/home/lanayr/Downloads/Matedoro_React-Native/assets/sounds/notification-sound-1-253323.mp3');

	const requestPermissions = async () => {
		const { status } = await Notifications.requestPermissionsAsync();
		if (status !== 'granted') {
			alert('Permission for notifications not granted. Please enable it in the settings.');
		}
	};

	useEffect(() => {
		// clearHistory();
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
		// Convert `cycleFocusTime` and `elapsedTime` into minutes and seconds for calculation.
		const focusTimePerCycleMinutes = cycleFocusTime / 60000; // cycleFocusTime in ms to minutes
		const totalElapsedMinutes = parseInt(elapsedTime.minutes);
		const totalElapsedSeconds = parseInt(elapsedTime.seconds);

		// Total work time in minutes and seconds
		const totalMinutes = totalCycleNumber * focusTimePerCycleMinutes + totalElapsedMinutes;
		const totalSeconds = totalMinutes * 60 + totalElapsedSeconds; // convert everything to seconds for accuracy

		// Format the result as hours, minutes, and seconds.
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = Math.round(totalSeconds % 60);

		return `${hours}h ${minutes}m ${seconds}s`;
	};

	useEffect(() => {
		const loadSessions = async () => {
			try {
				const storedSessions = await AsyncStorage.getItem('completedSessions');
				if (storedSessions) {
					setCompletedSessions(JSON.parse(storedSessions));
				}
			} catch (error) {
				console.error('Failed to load sessions from storage:', error);
			}
		};
		loadSessions();
	}, []);

	const clearHistory = async () => {
		try {
			await AsyncStorage.removeItem('completedSessions');
			setCompletedSessions([]);
			console.log('Session history cleared.');
		} catch (error) {
			console.error('Failed to clear session history:', error);
		}
	};

	const addToHistory = async () => {
		try {
			const currentDate = new Date();
			const workTime = totalWorkTime(); // Replace with actual work time from your timer.
			const sessionsCount = totalCycleNumber;
			setIsSessionEnded(false); // Reset on new session
			playNotificationSound();
			// Add the completed session to the state array.
			setCompletedSessions((prev) => [
				...prev,
				{ workTime, sessions: sessionsCount, date: currentDate },
			]);
			// Create a new session object
			const session = {
				workTime,
				sessions: sessionsCount,
				date: currentDate,
			};

			const existingSessions = await AsyncStorage.getItem('completedSessions');
			const parsedSessions = existingSessions ? JSON.parse(existingSessions) : [];

			// Update the sessions array and save it to AsyncStorage
			const updatedSessions = [...parsedSessions, session];
			await AsyncStorage.setItem('completedSessions', JSON.stringify(updatedSessions));

			setCompletedSessions(updatedSessions);

			setTotalWorkMinutes(0); // Reset
		} catch (error) {
			console.error('Error saving session history:', error);
		}
	}

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
		addToHistory()
		setTotalCycleNumber(0);
	};

	const endSession = () => {

		if (pomodoroState === PomodoroState.FOCUS) {
			// If in a focus cycle, calculate the worked time in the current cycle
			const focusTimeWorked = (cycleFocusTime - (parseInt(timeLeft.minutes) * 60 + parseInt(timeLeft.seconds))) / 60;
			setTotalWorkMinutes((prev) => prev + focusTimeWorked);
		}
		// Stop the timer and reset the states when ending the session.
		setIsRunning(false);
		setIsFocus(true);
		setCycleNumber(0);
		setPomodoroState(PomodoroState.FOCUS); // Set the state to NONE to indicate no ongoing session.
		setTimeLeft(cycleFocusTime)
		stopTimer();
		addToHistory();
		sendNotification("Pomodoro Session Ended", "Great work! You have completed the Pomodoro session.");
		setIsSessionEnded(true); // Set session ended to true
	};

	const handleCycleNumber = () => {
		if (cycleNumber > 2) {
			setCycleNumber(0)
		} else {
			setTotalCycleNumber(totalCycleNumber + 1);
			setCycleNumber(cycleNumber + 1);
		}
	}

	const { setTimeLeft, startTimer, stopTimer, timeLeft, timerOver, elapsedTime } = useTimer();

	const onTimerUpdate = useCallback(() => {
		if (isFocus) {
			const focusTimeWorked = (cycleFocusTime - (parseInt(timeLeft.minutes) * 60 + parseInt(timeLeft.seconds))) / 60;
			setTotalWorkMinutes((prev) => prev + focusTimeWorked);
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
	}, [isFocus, cyclePauseTime, cycleFocusTime, startTimer, timeLeft]);

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
				completedSessions,
				isSessionEnded,
				setIsRunning
			}}
		>
			{children}
		</PomodoroContext.Provider>
	);
}
