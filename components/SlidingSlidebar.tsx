import React, { useState, useRef, useEffect, useContext } from "react";
import {
	View,
	Text,
	Animated,
	StyleSheet,
	Dimensions,
	ScrollView,
} from "react-native";
import OldCycle from "./OldCycle";
import { PomodoroContext } from "@/providers/PomodoroProvider";
import { ChevronLeft } from "lucide-react-native";
import HistoryButton from "./HistoryButton";

// Get the device width
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

type Props = {
	visible: boolean;
	setVisible: (visible: boolean) => void;
};

const SlideSidebar = (props: Props) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const sidebarAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
	const { completedSessions } = useContext(PomodoroContext);

	const onCloseSidebar = () => {
		props.setVisible(true);
	};

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
	});

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.sidebar,
					{ transform: [{ translateX: sidebarAnim }] },
				]}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<View style={{ top: 20, left: 20 }}>
						<HistoryButton
							onPress={onCloseSidebar}
							icon=<ChevronLeft
								color={"black"}
								size={30}
							></ChevronLeft>
						></HistoryButton>
					</View>

					<Text
						style={{
							fontSize: 20,
							justifyContent: "flex-start",
							top: 20,
						}}
					>
						H I S T O R Y
					</Text>
					<View style={{ width: 20 }}></View>
				</View>
				<View style={{ top: 30 }}>
					<ScrollView
						contentContainerStyle={styles.scrollViewContent}
					>
						{completedSessions.map((session, index) => (
							<OldCycle
								key={index}
								workTime={session.workTime}
								sessions={session.sessions}
								date={session.date}
							/>
						))}
					</ScrollView>
				</View>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		top: 50,
	},
	sidebar: {
		position: "absolute",
		display: "flex",
		flexDirection: "column",
		zIndex: 2,
		top: 0,
		bottom: 0,
		alignItems: "center",
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		backgroundColor: "#f0f0f0",
		borderBottomRightRadius: 20,
		borderTopRightRadius: 20,
	},
	scrollViewContent: {
		alignItems: "center",
		paddingBottom: 20,
	},
});

export default SlideSidebar;
