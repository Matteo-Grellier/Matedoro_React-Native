import { PlusIcon } from "lucide-react-native";
import { View, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
	onPress: () => void;
	component: React.ReactNode;
};

export default function (props: Props) {
	return (
		<View style={styles.popupButtonContainer}>
			<TouchableOpacity
				style={{
					borderWidth: 1,
					borderColor: "black",
					alignItems: "center",
					justifyContent: "center",
					width: 70,
					position: "absolute",
					top: -150,
					right: 0,
					height: 70,
					backgroundColor: "white",
					borderRadius: 20,
					shadowColor: "black",
					shadowOpacity: 1,
					elevation: 5,
				}}
				onPress={props.onPress}
			>
				{props.component}
			</TouchableOpacity>
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
