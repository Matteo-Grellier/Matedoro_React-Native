import {
	View,
	StyleSheet
} from "react-native";
import { Pomodoro } from "@/components/Pomodoro";
import { useCallback, useContext, useEffect, useState } from "react";
import { AlignJustifyIcon, PlusIcon, TimerOff } from "lucide-react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import OpenCloseButton from "@/components/Modal/OpenCloseButton";
import PlayButton from "@/components/PlayButton";
import TimerTypePopup from "@/components/Modal/TimerTypePopup";
import SlideSidebar from "@/components/SlidingSlidebar";
import { PomodoroContext } from "@/providers/PomodoroProvider";
import { PomodoroService } from "@/services/PomodoroService";
import { setupDatabaseAsync } from "@/storage.tsx/db";


function App() {
	PomodoroService.getSomething();
	const [bool, setBool] = useState(false);
	const { createNewSession, endSession } = useContext(PomodoroContext);

	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const setModalVisible = (isVisible: boolean) => {
		setIsModalVisible(!isModalVisible);
	};
	const [isSidingBarVisible, setSidingBarVisible] = React.useState(true);
	const setSidingBar = (isVisible: boolean) => {
		setSidingBarVisible(!isSidingBarVisible);
	};

	const wtf = () => {
		endSession()
	}


	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<View style={{ position: 'absolute', top: 70, right: 40 }}>
				<OpenCloseButton onPress={() => setSidingBar(!isSidingBarVisible)} component={<AlignJustifyIcon color={"black"} size={30} ></AlignJustifyIcon>}></OpenCloseButton>
			</View>
			<SlideSidebar visible={isSidingBarVisible}></SlideSidebar>
			<Pomodoro onClick={bool} />
			<View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
				<PlayButton />
				<View style={{ marginLeft: 10 }}>
					<OpenCloseButton
						onPress={wtf}
						component={<TimerOff size={30} color={"black"} />}
					/>
				</View>
			</View>

			<TimerTypePopup
				isModalVisible={isModalVisible}
				setModalVisible={setModalVisible}
			></TimerTypePopup>
			<View style={{ position: "absolute", top: 750, left: 300 }}>
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
