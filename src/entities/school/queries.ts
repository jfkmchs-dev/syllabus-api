import {db} from "../../index.ts";
import {schools} from "./db.ts";
import {eq, sql} from "drizzle-orm";

export const SchoolQueries = {
    async school(_: any, args: { id: string }) {
        const { id } = args;
        const school = (await db
            .select()
            .from(schools)
            .where(eq(schools.id, id))
            .limit(1))[0];

        if (!school) {
            throw new Error("School not found");
        }

        return school;
    },

    async searchSchools(_: any, args: { query: string; skip: number; take: number }) {
        const { query, skip, take } = args;

        return db
            .select()
            .from(schools)
            .where(sql`${schools.shortName} ILIKE ${`%${query}%`} OR ${schools.fullName} ILIKE ${`%${query}%`}`)
            .offset(skip)
            .limit(take);
    }
}