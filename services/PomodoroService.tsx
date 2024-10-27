import { db } from "@/storage.tsx/db";

export type PomodoroSession = {
	workTime: string;
	sessions: number;
};

export const PomodoroService = {

	async getSomething() {
		(await db).execAsync('SELECT * FROM PomodoroSession')
			.then((r) => { console.log(r) })
			.catch((e: Error) => { console.log(e) })
	},
	async addSession(session: PomodoroSession) {
		try {
			await (await db).prepareAsync(`
	        INSERT INTO PomodoroSession (focus_time, pomodori_count)
	        VALUES ($workTime, $sessions)
      `);
			console.log("Session added to history!");
		} catch (error) {
			console.error("Error adding session:", error);
		}
	},

	async getSessions(): Promise<PomodoroSession[]> {
		try {
			const dbInstance = await db;
			const allRows = await (await db).getAllAsync('SELECT * FROM PomodoroSession') as PomodoroSession[];
			console.log(allRows[0].sessions)
			return allRows;
		} catch (error) {
			console.error("Error fetching sessions:", error);
			return [];
		}
	},
};
