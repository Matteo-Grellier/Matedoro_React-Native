import { PomodoroProvider } from "@/providers/PomodoroProvider";
import { Stack } from "expo-router";

export const unstable_settings = {
	initialRouteName: "app",
};

export default function RootLayout() {
	return (
		<PomodoroProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="app" options={{ headerShown: false, navigationBarHidden: true }} />
			</Stack>
		</PomodoroProvider>
	);
}
