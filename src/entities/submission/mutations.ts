import type {AuthContext} from "../../auth.ts";
import {db} from "../../index.ts";
import {submissions} from "./db.ts";
import {eq} from "drizzle-orm";

export const SubmissionMutations = {
    async deleteSubmission(_: any, args: { id: string }, ctx: AuthContext) {
        if (!ctx.uuid) return null;

        const { id } = args;

        try {
            await db
                .delete(submissions)
                .where(eq(submissions.id, id))
                .returning()
                .then((res) => res[0]);

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
};