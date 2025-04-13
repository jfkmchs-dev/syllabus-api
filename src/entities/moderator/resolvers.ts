import {ModeratorQueries} from "./queries.ts";
import {db} from "../../index.ts";
import {changes} from "../change/db.ts";
import {eq} from "drizzle-orm";
import {flags} from "../flag/db.ts";

export const ModeratorResolvers = {
    Query: {
        ...ModeratorQueries,
    },
    Moderator: {
        async changes(parent: any) {
            return db.select()
                .from(changes)
                .where(eq(changes.moderatorId, parent.id))
        },
        async flags(parent: any) {
            return db.select()
                .from(flags)
                .where(eq(flags.moderatorId, parent.id))
        },
    }
}