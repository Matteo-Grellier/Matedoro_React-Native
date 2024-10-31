import { View, StyleSheet } from "react-native";
import { Pomodoro } from "@/components/Pomodoro";
import { useContext, useState } from "react";
import {
	HistoryIcon,
	PlusIcon,
	TimerOff
} from "lucide-react-native";
import React from "react";
import OpenCloseButton from "@/components/Modal/OpenCloseButton";
import PlayButton from "@/components/PlayButton";
import TimerTypePopup from "@/components/Modal/TimerTypePopup";
import SlideSidebar from "@/components/SlidingSlidebar";
import { PomodoroContext } from "@/providers/PomodoroProvider";
import HistoryButton from "@/components/HistoryButton";

function App() {
	const [bool, setBool] = useState(false);
	const { createNewSession, endSession } = useContext(PomodoroContext);

	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const setModalVisible = (isVisible: boolean) => {
		setIsModalVisible(!isModalVisible);
	};
	const [isSidingBarVisible, setSidingBarVisible] = React.useState(true);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<View style={{ position: "absolute", top: 70, left: 20 }}>
				<HistoryButton
					onPress={() => setSidingBarVisible(false)}
					icon={<HistoryIcon size={30} color={"black"} />}
				></HistoryButton>
			</View>
			<SlideSidebar
				setVisible={setSidingBarVisible}
				visible={isSidingBarVisible}
			></SlideSidebar>
			<Pomodoro onClick={bool} />
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					marginLeft: 10,
				}}
			>
				<View style={{ width: 50 }}></View>
				<PlayButton />
				<View style={{ marginLeft: 20 }}>
					<HistoryButton
						icon={<TimerOff size={30} color={"black"} />}
						onPress={endSession}
					></HistoryButton>
				</View>
			</View>

			<TimerTypePopup
				isModalVisible={isModalVisible}
				setModalVisible={setModalVisible}
			></TimerTypePopup>
			<View style={{ position: "absolute", bottom: 20, right: 20 }}>
				<OpenCloseButton
					onPress={() => setModalVisible(!isModalVisible)}
					component={<PlusIcon size={30} color={"black"} />}
				></OpenCloseButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	popupButtonContainer: {
		position: "absolute",
		paddingLeft: 300,
		backgroundColor: "black",
	},
});

export default App;
