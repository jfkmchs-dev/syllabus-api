import {ChangeQueries} from "./queries.ts";
import {ChangeMutations} from "./mutations.ts";
import {db} from "../../index.ts";
import {moderators} from "../moderator/db.ts";
import {eq} from "drizzle-orm";
import {sections} from "../section/db.ts";
import {classes} from "../class/db.ts";
import {professors} from "../professor/db.ts";

export const ChangeResolvers = {
    Query: ChangeQueries,
    Mutation: ChangeMutations,
    Change: {
        async moderator(parent: any) {
            return await db.select()
                .from(moderators)
                .where(eq(moderators.id, parent.moderatorId))
                .then((res) => res[0]);
        },
        async section(parent: any) {
            return await db.select()
                .from(sections)
                .where(eq(sections.id, parent.sectionId))
                .then((res) => res[0]);
        },
        async class(parent: any) {
            return await db.select()
                .from(classes)
                .where(eq(classes.id, parent.classId))
                .then((res) => res[0]);
        },
        async professor(parent: any) {
            return await db.select()
                .from(professors)
                .where(eq(professors.id, parent.professorId))
                .then((res) => res[0]);
        },
    }
}