
import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseAsync('DBName.db');
export const setupDatabaseAsync = async () => {
	(await db).execAsync(`
	CREATE TABLE "PomodoroSession"(
	    "id" UUID NOT NULL,
	    "work_session" UUID NOT NULL,
	    "pomodori_count" BIGINT NOT NULL,
	    "focus_time" BIGINT NOT NULL,
	    "break_time" BIGINT NOT NULL
	);
	ALTER TABLE
	    "PomodoroSession" ADD PRIMARY KEY("id");
	CREATE TABLE "WorkSession"(
	    "id" UUID NOT NULL,
	    "date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
	    "total_focus_time" BIGINT NOT NULL
	);
	ALTER TABLE
	    "WorkSession" ADD PRIMARY KEY("id");
	ALTER TABLE
	    "PomodoroSession" ADD CONSTRAINT "pomodorosession_work_session_foreign" FOREIGN KEY("work_session") REFERENCES "WorkSession"("id");
	`)
		.then(() => { console.log("EHEH") })
		.catch((e: Error) => { console.log(e) })
}
