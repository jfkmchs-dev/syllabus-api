import {flags} from "./db.ts";
import {db} from "../../index.ts";
import {and, eq} from "drizzle-orm";
import type {ChangeStatus} from "../changeStatus.ts";

export const FlagQueries = {
    async flag(_: any, args: { id: string }) {
        const { id } = args;

        return await db
            .select()
            .from(flags)
            .where(eq(flags.id, id))
            .then((res) => res[0]);
    },
    async flags(_: any, args: {
        skip: number;
        take: number;
        schoolId?: string;
        moderatorId?: string;
        status?: ChangeStatus;
    }) {
        let filters = [];

        if (args.schoolId) filters.push(eq(flags.sectionId, args.schoolId));
        if (args.moderatorId) filters.push(eq(flags.moderatorId, args.moderatorId));
        if (args.status) filters.push(eq(flags.status, args.status));

        return db
            .select()
            .from(flags)
            .where(and(...filters))
            .offset(args.skip)
            .limit(args.take)
    }
}