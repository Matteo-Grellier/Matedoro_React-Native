import { PauseIcon, Play, PlayIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
	StyleSheet,
	Button,
	View,
	SafeAreaView,
	Text,
	Alert,
	Pressable,
} from "react-native";

type buttonHook = {
	onToggle: (booleen: boolean) => void;
};

export default function (props: buttonHook) {
	const [isClicked, setIsClicked] = useState(false);
	const changeButton = () => {
		props.onToggle(!isClicked);
		setIsClicked(!isClicked);
	};
	return (
		<Pressable style={styles.Button} onPress={changeButton}>
			{isClicked ? (
				<PauseIcon size={40} color={"black"} />
			) : (
				<PlayIcon size={40} color={"black"} />
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	Button: {
		borderColor: "black",
		borderRadius: 15,
		borderWidth: 2,
		width: 100,
		height: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
