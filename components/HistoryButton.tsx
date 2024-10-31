import { TouchableOpacity, StyleSheet, View } from "react-native";

type props = {
	onPress: () => void;
	icon: React.ReactNode;
};

export default function HistoryButton(props: props) {
	return (
		<View>
			<TouchableOpacity style={styles.button} onPress={props.onPress}>
				{props.icon}
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	button: {
		width: 24,
		height: 24,
	},
});
