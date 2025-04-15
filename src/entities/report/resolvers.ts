import {ReportQueries} from "./queries.ts";
import {ReportMutations} from "./mutations.ts";
import {db} from "../../index.ts";
import {sections} from "../section/db.ts";
import {eq} from "drizzle-orm";

export const ReportResolvers = {
    Query: {
        ...ReportQueries
    },
    Mutation: {
        ...ReportMutations
    },
    Report: {
        async section(parent: any) {
            return db
                .select()
                .from(sections)
                .where(eq(sections.id, parent.sectionId))
                .then((res) => res[0]);
        }
    }
}