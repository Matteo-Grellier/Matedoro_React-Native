import React, { useState, useRef, useEffect, useContext } from 'react';
import {
	View,
	Text,
	Animated,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	ScrollView,
} from 'react-native';
import OldCycle from './OldCycle';
import { PomodoroContext } from '@/providers/PomodoroProvider';

// Get the device width
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
	visible: boolean
}

const SlideSidebar = (props: Props) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const sidebarAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
	const { completedSessions, createNewSession, endSession } = useContext(PomodoroContext);

	useEffect(() => {

		if (props.visible) {
			// Close the sidebar
			Animated.timing(sidebarAnim, {
				toValue: -SCREEN_WIDTH,
				duration: 300,
				useNativeDriver: true,
			}).start();
		} else {
			// Open the sidebar
			Animated.timing(sidebarAnim, {
				toValue: 0 - 60,
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
		setSidebarOpen(!props.visible);
	})

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.sidebar,
					{ transform: [{ translateX: sidebarAnim }] },
				]}
			>
				<ScrollView contentContainerStyle={styles.scrollViewContent}>
					{completedSessions.map((session, index) => (
						<OldCycle
							key={index}
							workTime={session.workTime}
							sessions={session.sessions}
							date={session.date}
						/>
					))}
					{/* You can add as many <OldCycle /> components as you like */}
				</ScrollView>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: 80,
		height: 700,

	},
	sidebar: {
		position: 'absolute',
		display: "flex",
		flexDirection: "column",
		left: -100,
		zIndex: 2,
		top: 0,
		bottom: 0,
		alignItems: "center",
		width: SCREEN_WIDTH * 0.6, // Sidebar width is 80% of screen width
		backgroundColor: '#f0f0f0',
		padding: 10,
		elevation: 5, // For shadow effect on Android
		shadowColor: '#000', // For shadow effect on iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 4,
		borderBottomRightRadius: 20,
		borderTopRightRadius: 20
	},
	scrollViewContent: {
		alignItems: 'center', // Align items centrally
		paddingBottom: 20, // Add some padding at the bottom for a nice scrolling feel
	},
});

export default SlideSidebar;
