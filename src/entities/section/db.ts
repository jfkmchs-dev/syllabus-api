import {boolean, index, pgTable, smallint, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {schools} from "../school/db.ts";
import {classes} from "../class/db.ts";
import {relations, sql} from "drizzle-orm";
import {professors} from "../../db/schema.ts";
import {submissions} from "../submission/db.ts";
import {flags} from "../flag/db.ts";
import {changes} from "../change/db.ts";
import {reports} from "../report/db.ts";
import {textbookCost} from "../textbookCost.ts";

export const sections = pgTable('sections', {
    id: uuid().defaultRandom().primaryKey(),
    reviewed: boolean().default(false).notNull(),
    dateCreated: timestamp('date_created').defaultNow().notNull(),

    submissionId: uuid('submission_id').references(() => submissions.id).notNull(),

    schoolId: uuid('school_id').references(() => schools.id).notNull(),

    professorId: uuid('professor_id').references(() => professors.id).notNull(),
    professorName: varchar('professor_name').notNull(),

    classId: uuid('class_id').references(() => classes.id),
    className: varchar('class_name').notNull(),
    fullClassName: varchar('full_class_name').notNull(),

    content: varchar(),

    classLength: smallint(),
    comments: varchar(),
    textbookCost: textbookCost(),
}, table => [
    index('sections_trgm_index').using('gin', sql`(
        class_name || ' ' || 
        full_class_name || ' ' ||
        professor_name
    ) gin_trgm_ops`),
]);

export const sectionRelations = relations(sections, ({one, many}) => ({
    professor: one(professors, {
        fields: [sections.professorId],
        references: [professors.id]
    }),
    school: one(schools, {
        fields: [sections.schoolId],
        references: [schools.id]
    }),
    submission: one(submissions, {
        fields: [sections.submissionId],
        references: [submissions.id]
    }),
    reports: many(reports),
    changes: many(changes),
    flags: many(flags),
}));