import {db} from "../../index.ts";
import {changes} from "./db.ts";
import {eq} from "drizzle-orm";
import {sections} from "../section/db.ts";
import {TextbookCost} from "../../db/schema.ts";
import type {AuthContext} from "../../auth.ts";

export const ChangeMutations = {
    async createChange(
        _: any,
        args: {
            reason: string;
            date: string;
            sectionId: string;
            classId: string;
            professorId: string;
            classLength: number;
            content: string;
            textbookCost: number;
        },
        ctx: AuthContext,
    ) {
        const { reason, date, sectionId, classId, professorId, classLength, content, textbookCost } = args;

        // @ts-ignore
        return await db
            .insert(changes)
            .values({
                // @ts-ignore
                reason,
                date,
                sectionId,
                classId,
                moderatorId: ctx.uuid,
                professorId,
                classLength,
                content,
                textbookCost,
            })
            .returning()
            .then((res) => res[0]);
    },
    async updateChange(
        _: any,
        args: {
            id: string;
            reason: string;
            date: string;
            sectionId: string;
            classId: string;
            professorId: string;
            classLength: number;
            content: string;
            textbookCost: TextbookCost;
        },
    ) {
        const { id, reason, date, sectionId, classId, professorId, classLength, content, textbookCost } = args;

        return await db
            .update(changes)
            .set({
                reason,
                date: new Date(Date.parse(date)),
                sectionId,
                classId,
                professorId,
                classLength,
                content,
                textbookCost,
            })
            .where(eq(changes.id, id))
            .returning()
            .then((res) => res[0]);
    },

    async deleteChange(_: any, args: { id: string }) {
        const { id } = args;

        return await db
            .delete(changes)
            .where(eq(changes.id, id))
            .returning()
            .then((res) => res[0]);
    },

    async denyChange(_: any, args: { id: string }) {
        const { id } = args;

        return db
            .update(changes)
            .set({
                status: 'DENIED',
            })
            .where(eq(changes.id, id))
            .returning()
            .then((res) => res[0]);
    },

    async approveChange(_: any, args: { id: string }) {
        const { id } = args;

        let change = await db
            .update(changes)
            .set({
                status: 'APPROVED',
            })
            .where(eq(changes.id, id))
            .returning()
            .then((res) => res[0])

        await db
            .update(sections)
            .set({
                classId: change.classId,
                professorId: change.professorId,
                classLength: change.classLength,
                content: change.content,
                textbookCost: change.textbookCost,
            })
            .where(eq(sections.id, change.sectionId));

        return change;
    },
}