import {SchoolQueries} from "./queries.ts";
import {db} from "../../index.ts";
import {classes} from "../class/db.ts";
import {eq} from "drizzle-orm";
import {professors} from "../professor/db.ts";
import {submissions} from "../submission/db.ts";
import {sections} from "../section/db.ts";
import {SchoolMutations} from "./mutations.ts";

export const SchoolResolvers = {
    Query: {
        ...SchoolQueries
    },
    Mutation: {
        ...SchoolMutations
    },
    School: {
        classes: async (parent: any) => {
            return db
                .select()
                .from(classes)
                .where(eq(classes.schoolId, parent.id));
        },
        professors: async (parent: any) => {
            return db
                .select()
                .from(professors)
                .where(eq(professors.schoolId, parent.id));
        },
        sections: async (parent: any) => {
            return db
                .select()
                .from(sections)
                .where(eq(sections.schoolId, parent.id));
        },
        submissions: async (parent: any) => {
            return db
                .select()
                .from(submissions)
                .where(eq(submissions.schoolId, parent.id));
        }
    }
}