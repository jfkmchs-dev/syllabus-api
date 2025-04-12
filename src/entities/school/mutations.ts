import {db} from "../../index.ts";
import {schools} from "./db.ts";
import {eq} from "drizzle-orm";

export const SchoolMutations = {
    async createSchool(_: any, args: {shortName: string, longName: string}) {
        let result = await db.insert(schools).values({
            shortName: args.shortName,
            fullName: args.longName
        }).returning({
            id: schools.id,
            shortName: schools.shortName,
            fullName: schools.fullName
        });

        return result[0];
    },

    async updateSchool(_: any, args: any) {
        let result = await db.update(schools).set({
            shortName: args.shortName,
            fullName: args.longName
        }).where(eq(schools.id, args.id)).returning()
        return result[0];
    }
}