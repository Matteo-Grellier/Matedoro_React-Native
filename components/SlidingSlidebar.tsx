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
import OpenCloseButton from './Modal/OpenCloseButton';
import { ArrowLeft } from 'lucide-react-native';

// Get the device width
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type Props = {
	visible: boolean
	setVisible: (visible: boolean) => void
}

const SlideSidebar = (props: Props) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const sidebarAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
	const { completedSessions, createNewSession, endSession, isSessionEnded } = useContext(PomodoroContext);

	const onCloseSidebar = () => {
		props.setVisible(true);
	}

	useEffect(() => {
		if (props.visible) {
			Animated.timing(sidebarAnim, {
				toValue: -SCREEN_WIDTH,
				duration: 300,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(sidebarAnim, {
				toValue: 0,
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
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
					<OpenCloseButton onPress={onCloseSidebar} component={<ArrowLeft color={"black"} size={30}></ArrowLeft>}></OpenCloseButton>
					<Text style={{ fontSize: 20, justifyContent: "flex-start" }}>H I S T O R Y</Text>
					<View style={{ width: 70 }}></View>
				</View>

				<ScrollView contentContainerStyle={styles.scrollViewContent}>

					{completedSessions.map((session, index) => (
						<OldCycle
							key={index}
							workTime={session.workTime}
							sessions={session.sessions}
							date={session.date}
						/>
					))}
				</ScrollView>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: SCREEN_WIDTH,
		height: 700,

	},
	sidebar: {
		position: 'absolute',
		display: "flex",
		flexDirection: "column",
		zIndex: 2,
		top: 0,
		bottom: 0,
		alignItems: "center",
		width: SCREEN_WIDTH, // Sidebar width is 80% of screen width
		height: SCREEN_HEIGHT,
		backgroundColor: '#f0f0f0',
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
