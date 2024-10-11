import { View, TouchableOpacity, Text } from "react-native";

type Props = {
	// title: string;
	onPress: () => void;
	buttonText: string;
};

export default function (props: Props) {
	return (
		<View style={{ paddingBottom: 50 }}>
			<TouchableOpacity
				style={{
					borderWidth: 1,
					borderColor: "black",
					alignItems: "center",
					justifyContent: "center",
					paddingRight: 30,
					paddingLeft: 30,
					top: 300,
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
				<Text style={{ fontSize: 25 }}>{props.buttonText}</Text>
			</TouchableOpacity>
		</View>
	);
}
