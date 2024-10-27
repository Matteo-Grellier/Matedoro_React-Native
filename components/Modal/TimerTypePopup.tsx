import { Modal, View, Text, Button } from "react-native";
import { ArrowDown, MinusIcon, PlusIcon } from "lucide-react-native";
import ChangeTimerType from "./ChangeTimerType";
import OpenCloseButton from "./OpenCloseButton";
import { PomodoroContext } from "@/providers/PomodoroProvider";
import { useContext } from "react";

type popupProps = {
	isModalVisible: boolean;
	setModalVisible: (bool: boolean) => void;
};

export default function (props: popupProps) {
	const handleModal = () => props.setModalVisible(!props.isModalVisible);
	const { setTimeLeft, setIsLong, createNewSession } = useContext(PomodoroContext);

	const changeType25 = () => {
		createNewSession(1500000, 300000)
		// createNewSession(5000, 3000)
		setIsLong(false)
	};

	const changeType45 = () => {
		createNewSession(2700000, 900000)
		setIsLong(true)
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
						borderRadius: 50,
					}}
				>
					<View style={{ top: -50 }}>
						<ChangeTimerType
							buttonText="25min / 5min"
							onPress={changeType25}
						/>
						<ChangeTimerType
							buttonText="45min / 15min"
							onPress={changeType45}
						/>
					</View>
					<View style={{ position: "absolute", top: 300, left: 300 }}>
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
