import { Modal, View, Text, Button } from "react-native";
import { MinusIcon, PlusIcon } from "lucide-react-native";
import ChangeTimerType from "./ChangeTimerType";
import OpenCloseButton from "./OpenCloseButton";

type popupProps = {
	isModalVisible: boolean;
	setModalVisible: (bool: boolean) => void;
};

export default function (props: popupProps) {
	const handleModal = () => props.setModalVisible(!props.isModalVisible);
	const changeType25 = () => {
		console.log("change type 25");
	};

	const changeType5 = () => {
		console.log("change type 5");
	};

	return (
		<Modal animationType="slide" transparent={true} visible={props.isModalVisible}>
			<View style={{
				backgroundColor: "grey",
				width: "100%",
				height: "50%",
				bottom: 0,
				borderTopRightRadius: 18,
				borderTopLeftRadius: 18,
				position: "absolute"
			}}>
				<View
					style={{
						flex: 1,
						display: "flex",
						alignItems: "center",
						backgroundColor: "grey",
						borderRadius: 50
					}}
				>
					<ChangeTimerType
						buttonText="25min / 5min"
						onPress={changeType25}
					/>
					<ChangeTimerType
						buttonText="45min / 15min"
						onPress={changeType5}
					/>
					<View style={{ position: "absolute", top: 350, left: 300 }}>
						<OpenCloseButton
							onPress={handleModal}
							component={<MinusIcon size={30} color={"black"} />}
						/>
					</View>

				</View>
			</View>
		</Modal >
	);
}
