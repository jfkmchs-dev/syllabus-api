import {db} from "../../index.ts";
import {reports} from "./db.ts";
import {eq} from "drizzle-orm";

export const ReportMutations = {
    async createReport(_: any, args: {
        type: string;
        title: string;
        body: string;
        authorEmail: string;
        sectionId: string;
    }) {
        const { type, title, body, authorEmail, sectionId } = args;

        return await db
            .insert(reports)
            .values({
                type,
                title,
                body,
                dateCreated: new Date(),
                authorEmail,
                sectionId
            })
            .returning()
            .then((res) => res[0]);
    },

    async deleteReport(_: any, args: { id: string }) {
        const { id } = args;

        return await db
            .delete(reports)
            .where(eq(reports.id, id))
            .returning()
            .then((res) => res[0]);
    },
}