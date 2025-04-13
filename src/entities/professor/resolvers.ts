import {ProfessorQueries} from "./queries.ts";
import {ProfessorMutations} from "./mutations.ts";
import {db} from "../../index.ts";
import {professors} from "./db.ts";
import {eq} from "drizzle-orm";
import {schools} from "../school/db.ts";
import {sections} from "../section/db.ts";

export const ProfessorResolvers = {
    Query: {
        ...ProfessorQueries
    },
    Mutation: {
        ...ProfessorMutations
    },
    Professor: {
        async school(parent: any) {
            let schoolId = await db.select({schoolId: professors.schoolId})
                .from(professors)
                .where(eq(professors.id, parent.id))
                .then((res) => res[0]?.schoolId);

            return await db.select()
                .from(schools)
                .where(eq(schools.id, schoolId))
                .then((res) => res[0]);
        },
        async sections(parent: any) {
            return db.select()
                .from(sections)
                .where(eq(sections.professorId, parent.id))
        }
    }
}