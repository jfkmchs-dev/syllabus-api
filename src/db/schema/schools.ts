import {pgTable, uuid, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {classes} from "./classes.ts";
import {professors} from "./professors.ts";
import {sections} from "./sections.ts";
import {submissions} from "./submissions.ts";

export const schools = pgTable('schools', {
    id: uuid().defaultRandom().primaryKey(),
    shortName: varchar('name').notNull(),
    fullName: varchar('full_name').notNull(),
});
export const schoolRelations = relations(schools, ({many}) => ({
    classes: many(classes),
    professors: many(professors),
    sections: many(sections),
    submissions: many(submissions),
}))