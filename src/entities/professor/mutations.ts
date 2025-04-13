import {db} from "../../index.ts";
import {professors} from "./db.ts";
import {eq} from "drizzle-orm";

export const ProfessorMutations = {
    async createProfessor(_: any, args: { name: string; schoolId: string }) {
        const { name, schoolId } = args;

        return await db
            .insert(professors)
            .values({
                name,
                schoolId,
            })
            .returning()
            .then((res) => res[0]);
    },

    async updateProfessor(_: any, args: { id: string; name: string; schoolId: string }) {
        const { id, name, schoolId } = args;

        return await db
            .update(professors)
            .set({
                name,
                schoolId,
            })
            .where(eq(professors.id, id))
            .returning()
            .then((res) => res[0]);
    },

    async deleteProfessor(_: any, args: { id: string }) {
        const { id } = args;

        return await db
            .delete(professors)
            .where(eq(professors.id, id))
            .returning()
            .then((res) => res[0]);
    },
}