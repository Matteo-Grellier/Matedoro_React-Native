import { PomodoroProvider } from "@/providers/PomodoroProvider";
import { Stack } from "expo-router";

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: "app",
};


export default function RootLayout() {
	return (
		<PomodoroProvider>
			<Stack>
				<Stack.Screen name="app" options={{ headerShown: false }} />
			</Stack>
		</PomodoroProvider>
	);
}
