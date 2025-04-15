import {pgTable, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {sections} from "../section/db.ts";

export const reports = pgTable('reports', {
    id: uuid().defaultRandom().primaryKey(),
    type: varchar().notNull(),
    title: varchar().notNull(),
    body: varchar().notNull(),
    dateCreated: timestamp().defaultNow(),
    authorEmail: varchar().notNull(),
    sectionId: uuid().notNull()
});
export const reportRelations = relations(reports, ({one}) => ({
    section: one(sections, {
        fields: [reports.sectionId],
        references: [sections.id]
    })
}))