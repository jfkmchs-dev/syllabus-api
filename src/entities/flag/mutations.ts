import {db} from "../../index.ts";
import {flags} from "./db.ts";
import {eq} from "drizzle-orm";
import type {AuthContext} from "../../auth.ts";
import type {ChangeStatus} from "../changeStatus.ts";

export const FlagMutations = {
    async createFlag(_: any, args: { sectionId: string; reason: string}, ctx: AuthContext) {
        const { sectionId, reason } = args;

        return await db
            .insert(flags)
            .values({
                reason,
                sectionId,
                moderatorId: ctx.uuid
            })
            .returning()
            .then((res) => res[0]);
    },

    async updateFlag(_: any, args: { id: string; sectionId: string; moderatorId: string; status: ChangeStatus }) {
        const { id, sectionId, moderatorId, status } = args;

        return await db
            .update(flags)
            .set({
                sectionId,
                moderatorId,
                status,
            })
            .where(eq(flags.id, id))
            .returning()
            .then((res) => res[0]);
    },

    async deleteFlag(_: any, args: { id: string }) {
        const { id } = args;

        return await db
            .delete(flags)
            .where(eq(flags.id, id))
            .returning()
            .then((res) => res[0]);
    },
}