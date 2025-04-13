import {ClassQueries} from "./queries.ts";
import {db} from "../../index.ts";
import {schools} from "../school/db.ts";
import {eq} from "drizzle-orm";
import {sections} from "../section/db.ts";
import {ClassMutations} from "./mutations.ts";

export const ClassResolvers = {
    Query: {
        ...ClassQueries
    },
    Mutation: {
        ...ClassMutations
    },
    Class: {
        async school(parent: any) {
            return (await db.select()
                .from(schools)
                .where(eq(schools.id, parent.schoolId))
                .limit(1))[0];
        },
        async sections(parent: any) {
            return db.select()
                .from(sections)
                .where(eq(sections.classId, parent.id));
        }
    },
}