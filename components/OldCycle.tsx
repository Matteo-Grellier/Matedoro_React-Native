import { PomodoroContext } from '@/providers/PomodoroProvider';
import React, { useContext } from 'react';
import {
	View,
	Text, StyleSheet
} from 'react-native';

type StatsProps = {
	workTime: string;
	sessions: number;
	date: string;
};


export default ({ workTime, sessions, date }: StatsProps) => {
	return (
		<View style={styles.container}>
			<Text>Temps de travail : {workTime}</Text>
			<Text>Nombre de sessions : {sessions}</Text>
			<Text>Date : {date}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 210,
		borderRadius: 10,
		top: 10,
		height: 80,
		backgroundColor: "red",
		marginBottom: 10,
	},

})
