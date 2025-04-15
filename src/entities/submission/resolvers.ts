import {SubmissionQueries} from "./queries.ts";
import {SubmissionMutations} from "./mutations.ts";
import {db} from "../../index.ts";
import {schools} from "../school/db.ts";
import {eq} from "drizzle-orm";

export const SubmissionResolvers = {
    Query: {
        ...SubmissionQueries
    },
    Mutation: {
        ...SubmissionMutations
    },
    Submission: {
        section: async (parent: { sectionId: any; }, args: any) => {
            if (!parent.sectionId) return null;

            let result = await db.query.sections.findFirst({
                where: (sections, {eq}) => eq(sections.id, parent.sectionId),
            });

            if (!result) return null;

            return {
                ...result,
                dateCreated: result.dateCreated?.toISOString(),
            }
        },
        async school(parent: any) {
            return db
                .select()
                .from(schools)
                .where(eq(schools.id, parent.schoolId))
                .then((res) => res[0]);
        }
    }
};