import { useCallback, useEffect, useState } from "react";

export type TUseTimer = {
	hours: string;
	minutes: string;
	seconds: string;
};

const HOURS_IN_MS = 1000 * 60 * 60;
const MIN_IN_MS = 1000 * 60;
const SEC_IN_MS = 1000;

const formatNumber = (num: number) => {
	return num < 10 ? `0${num}` : `${num}`;
};

export const getTimeDiff = (diffInMSec: number): TUseTimer => {
	let diff = diffInMSec;
	const hours = Math.floor(diff / HOURS_IN_MS);
	diff -= hours * HOURS_IN_MS;
	const minutes = Math.floor(diff / MIN_IN_MS);
	diff -= minutes * MIN_IN_MS;
	const seconds = Math.floor(diff / SEC_IN_MS);
	return {
		hours: formatNumber(hours),
		minutes: formatNumber(minutes),
		seconds: formatNumber(seconds),
	};
};

export function useTimer(onTimerEnd?: () => void): {
	timeLeft: TUseTimer;
	elapsedTime: TUseTimer;
	setTimeLeft(timer: number): void;
	startTimer(): void;
	stopTimer(): void;
	timerOver(): void;
	setElapsedTime(num: number): void;
	elapsedTimeNumber: number;
} {
	const [timeLeft, setTimeLeft] = useState(30000);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	const timerOver = () => {
		setElapsedTime(0);
		if (onTimerEnd) {
			onTimerEnd();
		}
	}

	const startTimer = useCallback(() => {
		setIsRunning(true);
	}, []);

	const stopTimer = useCallback(() => {
		setIsRunning(false);
	}, []);

	useEffect(() => {
		if (isRunning) {
			const id = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1000) {
						timerOver();
					}
					return prev - 1000;
				});
				setElapsedTime((prev) => prev + 1000);
			}, 1000);
			return () => clearInterval(id);
		}
	}, [isRunning]);

	return {
		timeLeft: getTimeDiff(timeLeft),
		elapsedTime: getTimeDiff(elapsedTime),
		elapsedTimeNumber: elapsedTime,
		setTimeLeft,
		startTimer,
		stopTimer,
		timerOver,
		setElapsedTime,
	};
}
