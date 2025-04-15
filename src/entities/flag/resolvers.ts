import {FlagQueries} from "./queries.ts";
import {FlagMutations} from "./mutations.ts";
import {db} from "../../index.ts";
import {moderators} from "../moderator/db.ts";
import {eq} from "drizzle-orm";
import {sections} from "../section/db.ts";

export const FlagResolvers = {
    Query: {
        ...FlagQueries,
    },
    Mutation: {
        ...FlagMutations,
    },
    Flag: {
        async moderator(parent: any) {
            return db
                .select()
                .from(moderators)
                .where(eq(moderators.id, parent.moderatorId))
                .then((res) => res[0]);
        },
        async section(parent: any) {
            return db
                .select()
                .from(sections)
                .where(eq(sections.id, parent.sectionId))
                .then((res) => res[0]);
        }
    },
}