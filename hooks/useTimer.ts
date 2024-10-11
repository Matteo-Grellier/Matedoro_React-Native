import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
type TUseTimer = {
	minutes: string;
	seconds: string;
};

const HOURS_IN_MS = 1000 * 60 * 60;
const MIN_IN_MS = 1000 * 60;
const SEC_IN_MS = 1000;

// Définir un props booléen : si bouton appuyer lancer le compteur

const formatNumber = (num: number) => {
	return num < 10 ? `0${num}` : `${num}`;
};

const getTimeDiff = (diffInMSec: number): TUseTimer => {
	let diff = diffInMSec;
	const hours = Math.floor(diff / HOURS_IN_MS); // Give remaining hours
	diff -= hours * HOURS_IN_MS; // Subtract hours
	const minutes = Math.floor(diff / MIN_IN_MS); // Give remaining minutes
	diff -= minutes * MIN_IN_MS; // Subtract minutes
	const seconds = Math.floor(diff / SEC_IN_MS); // Give remaining seconds
	return {
		minutes: formatNumber(minutes),
		seconds: formatNumber(seconds),
	};
};
export function useTimer(
	value: number,
	buttonClicked: boolean,
): {
	time: TUseTimer;
	timer: number;
	setTimer(timer: number): void;
} {
	function setTimer(timer: number) {
		setTimeLeft(timer);
	}
	const [timeLeft, setTimeLeft] = useState(value);
	let coucou = timeLeft;

	useEffect(() => {
		const id = setInterval(() => {
			coucou -= 1000;
			setTimeLeft((prev) => prev - 1000);
			if (coucou <= 0) {
			}
		}, 1000);

		if (!buttonClicked) {
			clearTimeout(id);
		}

		return () => {
			clearTimeout(id);
		};
	}, [buttonClicked]);

	return {
		time: getTimeDiff(timeLeft),
		timer: coucou,
		setTimer,
	};
}
