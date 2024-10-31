import { PomodoroContext } from "@/providers/PomodoroProvider";
import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

type StatsProps = {
	workTime: string;
	sessions: number;
	date: Date;
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export default ({ workTime, sessions, date }: StatsProps) => {
	var options: Intl.DateTimeFormatOptions = {
		month: "numeric",
		day: "numeric",
	};
	console.log(date);
	const newDateAndMonth = date.toLocaleDateString("fr-FR", options);

	const year = date.getFullYear();

	return (
		<View style={styles.container}>
			<View style={{ width: 60, alignItems: "center" }}>
				<Text style={styles.text}>{newDateAndMonth}</Text>
				<Text style={styles.text}>{year}</Text>
			</View>
			<View style={{ alignItems: "center" }}>
				<Text style={styles.text}>{sessions}</Text>
				<Text style={styles.title}>cycles</Text>
			</View>
			<View style={{ alignItems: "center" }}>
				<Text style={styles.text}>{workTime}</Text>
				<Text style={styles.title}>focus time</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: SCREEN_WIDTH - 90,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		borderRadius: 10,
		top: 10,
		height: 80,
		backgroundColor: "white",
		borderColor: "black",
		borderWidth: 2,
		marginBottom: 20,
	},
	text: { fontSize: 15, justifyContent: "center", fontWeight: "800" },
	title: { fontWeight: "400" },
});
