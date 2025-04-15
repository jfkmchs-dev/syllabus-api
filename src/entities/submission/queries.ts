import {ApolloServer} from "@apollo/server";
import {db, SEARCH_THRESHOLD} from "../../index.ts";
import {sections, submissions} from "../../db/schema.ts";
import {and, eq, SQL, sql} from "drizzle-orm";
import type {AuthContext} from "../../auth.ts";

export const SubmissionQueries = {
    async submission(_: any, args: {id: string}, ctx: AuthContext) {
        if (!ctx.uuid) return null;

        let result = await db.query.submissions.findFirst({
            where: (submissions, {eq}) => eq(submissions.id, args.id),
        });

        if (!result) return null;

        return {
            ...result,
            dateSubmitted: result.dateSubmitted?.toISOString(),
        }
    },

    async submissions(_: any, _args: any, ctx: AuthContext) {
        if (!ctx.uuid) return null;

        let result = await db.query.submissions.findMany();

        return result.map((submission) => ({
            ...submission,
            dateSubmitted: submission.dateSubmitted?.toISOString(),
        }))
    },

    async outstandingSubmissions(_: any, _args: any, ctx: AuthContext) {
        if (!ctx.uuid) return null;

        let result = await db.query.submissions.findMany({
            where: sql`${submissions.sectionId} IS NULL`
        });

        return result.map((submission) => ({
            ...submission,
            dateSubmitted: submission.dateSubmitted?.toISOString(),
        }))
    }
}