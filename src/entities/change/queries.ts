import {changes} from "./db.ts";
import {and, eq, ilike, or, type SQL} from "drizzle-orm";
import {db} from "../../index.ts";

export const ChangeQueries = {
    async change(_: any, args: { id: string }) {
        const { id } = args;

        return await db
            .select()
            .from(changes)
            .where(eq(changes.id, id))
            .then((res) => res[0]);
    },
    async searchChanges(
        _: any,
        args: {
            query: string;
            skip: number;
            take: number;
            status?: 'PENDING' | 'APPROVED' | 'DENIED';
            sectionId?: string;
            classId?: string;
            professorId?: string;
        }
    ) {
        const { query, skip, take, sectionId, classId, professorId } = args;

        let conditions: SQL[] = [
            or(
                ilike(changes.reason, `%${query}%`),
                ilike(changes.content, `%${query}%`),
                ilike(changes.classLength, `%${query}%`),
            )!
        ];

        if (sectionId) conditions.push(eq(changes.sectionId, sectionId));
        if (classId) conditions.push(eq(changes.classId, classId));
        if (professorId) conditions.push(eq(changes.professorId, professorId));
        if (args.status) conditions.push(eq(changes.status, args.status));

        return await db
            .select()
            .from(changes)
            .where(and(...conditions))
            .offset(skip)
            .limit(take)
            .then((res) => res);
    },
}