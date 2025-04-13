import {moderators} from "./db.ts";
import {eq, ilike} from "drizzle-orm";
import {db} from "../../index.ts";

export const ModeratorQueries = {
    async moderator(_: any, args: { id: string }) {
        const { id } = args;

        return await db
            .select()
            .from(moderators)
            .where(eq(moderators.id, id))
            .then((res) => res[0]);
    },
    async searchModerators(_: any, args: { query: string; skip: number; take: number }) {
        const { query, skip, take } = args;

        return db
            .select()
            .from(moderators)
            .where(ilike(moderators.username, `%${query}%`))
            .limit(take)
            .offset(skip);
    },
}