import {pgTable, smallint, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {schools} from "../school/db.ts";
import {relations} from "drizzle-orm";
import {sections} from "../section/db.ts";

import {textbookCost} from "../textbookCost.ts";

export const submissions = pgTable('submissions', {
    // Required fields
    id: uuid().defaultRandom().primaryKey(),
    dateSubmitted: timestamp().defaultNow(),
    schoolId: uuid('school_id').references(() => schools.id).notNull(),
    className: varchar().notNull(),
    professor: varchar().notNull(),

    // Optional fields
    classLength: smallint(),
    textbookCost: textbookCost('textbook_cost'),
    description: varchar(),
    creatorEmail: varchar('creator_email'),
    creatorName: varchar('creator_name'),
    fileType: varchar('file_type').notNull().default('pdf'),

    sectionId: uuid('section_id'),
});
export const submissionRelations = relations(submissions, ({one}) => ({
    section: one(sections, {
        fields: [submissions.sectionId],
        references: [sections.id]
    }),
    school: one(schools, {
        fields: [submissions.schoolId],
        references: [schools.id]
    })
}));