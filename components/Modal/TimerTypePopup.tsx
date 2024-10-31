import { Modal, View, Text } from "react-native";
import {
	ChevronDown
} from "lucide-react-native";
import ChangeTimerType from "./ChangeTimerType";
import { PomodoroContext } from "@/providers/PomodoroProvider";
import { useContext } from "react";
import HistoryButton from "../HistoryButton";

type popupProps = {
	isModalVisible: boolean;
	setModalVisible: (bool: boolean) => void;
};

export default function (props: popupProps) {
	const handleModal = () => props.setModalVisible(!props.isModalVisible);
	const { setIsLong, createNewSession } =
		useContext(PomodoroContext);

	const changeType25 = () => {
		createNewSession(1500000, 300000);
		setIsLong(false);
	};

	const changeType45 = () => {
		createNewSession(2700000, 900000);
		setIsLong(true);
	};

	const changeType10 = () => {
		createNewSession(10000, 5000);
		setIsLong(true);
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={props.isModalVisible}
		>
			<View
				style={{
					backgroundColor: "white",
					width: "100%",
					height: "50%",
					bottom: 0,
					borderTopRightRadius: 18,
					borderTopLeftRadius: 18,
					position: "absolute",
				}}
			>
				<View
					style={{
						flex: 1,
						display: "flex",
						alignItems: "center",
					}}
				>
					<View
						style={{
							top: 20,
							width: "100%",
							alignItems: "center",
						}}
					>
						<HistoryButton
							icon={<ChevronDown size={30} color={"black"} />}
							onPress={handleModal}
						/>
						<Text
							style={{ fontSize: 22, fontWeight: "800", top: 24 }}
						>
							Choose your session duration
						</Text>
					</View>

					<View style={{ top: -28 }}>
						<ChangeTimerType
							buttonText="25min / 5min"
							onPress={changeType25}
						/>
						<ChangeTimerType
							buttonText="45min / 15min"
							onPress={changeType45}
						/>
						<ChangeTimerType
							buttonText="10sec / 5sec"
							onPress={changeType10}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
}
