import {
	Button,
	Pressable,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Modal,
} from "react-native";
import { Pomodoro } from "@/components/Pomodoro";
import { useState } from "react";
import { CrossIcon, PlusIcon } from "lucide-react-native";
import React from "react";
import OpenCloseButton from "@/components/Modal/OpenCloseButton";
import PlayButton from "@/components/PlayButton";
import TimerTypePopup from "@/components/Modal/TimerTypePopup";

export default function Index() {
	const [bool, setBool] = useState(false);
	const onTogglePlayButton = (newBool: boolean) => {
		setBool(newBool);
	};

	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const setModalVisible = (isVisible: boolean) => {
		setIsModalVisible(!isModalVisible);
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Pomodoro onClick={bool} />
			<PlayButton onToggle={onTogglePlayButton} />
			<TimerTypePopup
				isModalVisible={isModalVisible}
				setModalVisible={setModalVisible}
			></TimerTypePopup>
			<OpenCloseButton
				onPress={() => setModalVisible(!isModalVisible)}
				component={<PlusIcon size={30} color={"black"} />}
			></OpenCloseButton>
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
