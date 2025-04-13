import {db} from "../../index.ts";
import {professors} from "./db.ts";
import {and, eq, ilike} from "drizzle-orm";

export const ProfessorQueries = {
    async professor(_: any, { id }: { id: string }) {
        return await db
            .select()
            .from(professors)
            .where(eq(professors.id, id))
            .then((res) => res[0]);
    },
    async searchProfessors(_: any, { query, skip, take, schoolId }: { query: string; skip: number; take: number; schoolId?: string }) {
        const searchQuery = `%${query}%`;

        return await db
            .select()
            .from(professors)
            .where(and(
                schoolId !== undefined ? eq(professors.schoolId, schoolId) : undefined,
                ilike(professors.name, searchQuery),
            ))
            .limit(take)
            .offset(skip)
            .then((res) => res);
    },
}