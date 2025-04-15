import {reports} from "./db.ts";
import {db} from "../../index.ts";
import {eq} from "drizzle-orm";

export const ReportQueries = {
    async report(_: any, args: { id: string }) {
        const { id } = args;

        return await db
            .select()
            .from(reports)
            .where(eq(reports.id, id))
            .then((res) => res[0]);
    },
    async getReports(_: any) {
        return db
            .select()
            .from(reports);
    },
}