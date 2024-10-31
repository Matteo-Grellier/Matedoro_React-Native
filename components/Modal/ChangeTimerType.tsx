import { View, TouchableOpacity, Text } from "react-native";

type Props = {
	onPress: () => void;
	buttonText: string;
};

export default function (props: Props) {
	return (
		<View style={{ paddingBottom: 30 }}>
			<TouchableOpacity
				style={{
					borderWidth: 1,
					borderColor: "black",
					alignItems: "center",
					justifyContent: "center",
					paddingRight: 20,
					paddingLeft: 20,
					top: 100,
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
				<Text style={{ fontSize: 15 }}>{props.buttonText}</Text>
			</TouchableOpacity>
		</View>
	);
}
