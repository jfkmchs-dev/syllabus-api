import {db} from "../../index.ts";
import {classes} from "./db.ts";
import {eq, ilike} from "drizzle-orm";
export const ClassQueries = {
    async class(_: any, args: { id: string }) {
        const { id } = args;
        const class_ = (await db
            .select()
            .from(classes)
            .where(eq(classes.id, id))
            .limit(1))[0];

        if (!class_) return null;

        return class_;
    },
    async searchClasses(_: any, args: { query: string; skip: number; take: number }) {
        const { query, skip, take } = args;

        return db
            .select()
            .from(classes)
            .where(ilike(classes.className, `%${query}%`))
            .offset(skip)
            .limit(take);
    }
}