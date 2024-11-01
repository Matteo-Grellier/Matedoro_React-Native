import { View, TouchableOpacity } from "react-native";

type Props = {
	onPress?: () => void;
	component: React.ReactNode;
};

export default function (props: Props) {
	return (
		<View>
			<TouchableOpacity
				style={{
					alignItems: "center",
					justifyContent: "center",
					width: 70,
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
