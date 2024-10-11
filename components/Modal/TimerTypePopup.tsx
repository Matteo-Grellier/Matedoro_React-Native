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
		<Modal visible={props.isModalVisible}>
			<View
				style={{
					display: "flex",
					flex: 1,
					alignItems: "center",
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
			</View>

			<View>
				<OpenCloseButton
					onPress={handleModal}
					component={<MinusIcon size={30} color={"black"} />}
				/>
			</View>
		</Modal>
	);
}
