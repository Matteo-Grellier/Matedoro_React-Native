import { TUseTimer, getTimeDiff, useTimer } from "@/hooks/useTimer";
import {
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useState,
} from "react";
import * as Notifications from "expo-notifications";
import { Platform, Vibration } from "react-native";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CompletedSession = {
	workTime: string;
	sessions: number;
	date: string;
};

type PomodoroProviderState = {
	isFocus: boolean;
	timeLeft: TUseTimer;
	isRunning: boolean;
	cycleNumber: number;
	pomodoroState: PomodoroState;
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
	setIsRunning: (bool: boolean) => { },
};

enum cycleType {
	LONG,
	SHORT,
}

export const PomodoroContext =
	createContext<PomodoroProviderState>(initialState);

type PomodoroProviderProps = {
	children: ReactNode;
};

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export const PomodoroProvider = ({ children }: PomodoroProviderProps) => {
	const [isRunning, setIsRunning] = useState(false);
	const [isFocus, setIsFocus] = useState(true);
	const [cyclePauseTime, setCyclePauseTime] = useState(150000);
	const [cycleFocusTime, setCycleFocusTime] = useState(30000);
	const [cycleNumber, setCycleNumber] = useState(0);
	const [totalCycleNumber, setTotalCycleNumber] = useState(0);
	const [isLong, setIsLong] = useState(false);
	const [isSessionEnded, setIsSessionEnded] = useState(false);
	const [pomodoroState, setPomodoroState] = useState<PomodoroState>(
		PomodoroState.FOCUS,
	);
	const [completedSessions, setCompletedSessions] = useState<
		{ workTime: string; sessions: number; date: string }[]
	>([]);
	const [totalWorkTimeValue, setTotalWorkTimeValue] = useState(0);
	const [focusTimeInSecs, setFocusTimeInSecs] = useState(0)


	const customSound = require("../assets/sounds/notification-sound-1-253323.mp3");

	const requestPermissions = async () => {
		const { status } = await Notifications.requestPermissionsAsync();
		if (status !== "granted") {
			alert(
				"Permission for notifications not granted. Please enable it in the settings.",
			);
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
			console.error(
				"Erreur lors de la lecture du son de notification",
				error,
			);
		}
	};

	const sendNotification = async (title: string, body: string) => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title,
				body,
			},
			trigger: null,
		});
	};

	const totalWorkTime = () => {
		// setFocusTimeInSecs(prev => prev + totalWorkTimeValue)
		const diff = getTimeDiff(totalWorkTimeValue)
		return `${diff.hours}h ${diff.minutes}min ${diff.seconds}`
	};

	useEffect(() => {
		const loadSessions = async () => {
			try {
				const storedSessions =
					await AsyncStorage.getItem("completedSessions");
				if (storedSessions) {
					setCompletedSessions(JSON.parse(storedSessions));
				}
			} catch (error) {
				console.error("Failed to load sessions from storage:", error);
			}
		};
		loadSessions();
	}, []);

	const clearHistory = async () => {
		try {
			await AsyncStorage.removeItem("completedSessions");
			setCompletedSessions([]);
			console.log("Session history cleared.");
		} catch (error) {
			console.error("Failed to clear session history:", error);
		}
	};

	const addToHistory = async () => {
		try {
			const currentDate = new Date().toLocaleDateString();
			const workTime = totalWorkTime();
			const sessionsCount = totalCycleNumber;
			setIsSessionEnded(false);
			playNotificationSound();
			setCompletedSessions((prev) => [
				...prev,
				{ workTime, sessions: sessionsCount, date: currentDate },
			]);
			const session = {
				workTime,
				sessions: sessionsCount,
				date: currentDate,
			};

			const existingSessions =
				await AsyncStorage.getItem("completedSessions");
			const parsedSessions = existingSessions
				? JSON.parse(existingSessions)
				: [];

			const updatedSessions = [...parsedSessions, session];
			await AsyncStorage.setItem(
				"completedSessions",
				JSON.stringify(updatedSessions),
			);

			setCompletedSessions(updatedSessions);
			setElapsedTime(0);

		} catch (error) {
			console.error("Error saving session history:", error);
		}
	};

	const createNewSession = (
		cycleFocusTime: number,
		cyclePausesTime: number,
	) => {
		setPomodoroState(PomodoroState.FOCUS);
		setIsFocus(true);
		setCycleNumber(0);
		setCycleFocusTime(cycleFocusTime);
		setCyclePauseTime(cyclePauseTime);
		setTimeLeft(cycleFocusTime);
		setIsRunning(false);
		sendNotification(
			"New Pomodoro Session!",
			"A new Pomodoro session has started! Get ready to focus.",
		);
		addToHistory();
		setTotalCycleNumber(0);
	};

	const endSession = () => {
		if (pomodoroState === PomodoroState.FOCUS) {
			const focusTimeWorked =
				(cycleFocusTime -
					(parseInt(timeLeft.minutes) * 60 +
						parseInt(timeLeft.seconds))) /
				60;
		}
		setIsRunning(false);
		setIsFocus(true);
		setCycleNumber(0);
		setPomodoroState(PomodoroState.FOCUS);
		setTimeLeft(cycleFocusTime);
		stopTimer();
		addToHistory();
		sendNotification(
			"Pomodoro Session Ended",
			"Great work! You have completed the Pomodoro session.",
		);
		setIsSessionEnded(true);
		setTotalWorkTimeValue(0);
	};

	const handleCycleNumber = () => {
		if (cycleNumber > 2) {
			setCycleNumber(0);
		} else {
			setTotalCycleNumber(totalCycleNumber + 1);
			setCycleNumber(cycleNumber + 1);
		}
	};

	const {
		setTimeLeft,
		startTimer,
		stopTimer,
		timeLeft,
		timerOver,
		elapsedTime,
		setElapsedTime,
		elapsedTimeNumber,
	} = useTimer();

	const onTimerUpdate = useCallback(() => {
		if (isFocus) {
			const focusTimeWorked =
				(cycleFocusTime -
					(parseInt(timeLeft.minutes) * 60 +
						parseInt(timeLeft.seconds))) /
				60;
			setPomodoroState(PomodoroState.PAUSE);
			setIsFocus(false);
			setTimeLeft(cyclePauseTime);
			sendNotification(
				"Pause Time!",
				"C'est le moment de prendre une pause !",
			);
			playNotificationSound();
			Vibration.vibrate(2000);
		} else {
			setPomodoroState(PomodoroState.FOCUS);
			setIsFocus(true);
			setTimeLeft(cycleFocusTime);
			handleCycleNumber();
			sendNotification(
				"Focus Time!",
				"C'est le moment de se concentrer !",
			);
			playNotificationSound();
			Vibration.vibrate(2000);
		}
		startTimer();
	}, [isFocus, cyclePauseTime, cycleFocusTime, startTimer, timeLeft]);

	useEffect(() => {
		if (timeLeft.minutes === "00" && timeLeft.seconds === "00") {
			onTimerUpdate();
		}
	}, [timeLeft, onTimerUpdate]);

	useEffect(() => {
		if (isFocus && elapsedTimeNumber > 0) {
			console.log("Focus time elapsed: ", elapsedTimeNumber);
			setTotalWorkTimeValue(prev => prev + 1000)
		}
		else { }
	}, [elapsedTimeNumber]);

	const changeCycleType = useCallback(() => { }, [isLong]);

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
				setIsRunning,
			}}
		>
			{children}
		</PomodoroContext.Provider>
	);
};
