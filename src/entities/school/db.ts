import {pgTable, uuid, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {classes} from "../class/db.ts";
import {professors} from "../professor/db.ts";
import {sections} from "../section/db.ts";
import {submissions} from "../submission/db.ts";

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