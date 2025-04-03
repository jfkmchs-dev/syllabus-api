import {boolean, index, pgTable, smallint, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {schools} from "./schools.ts";
import {classes} from "./classes.ts";
import {relations, sql} from "drizzle-orm";
import {professors, professorsToSections} from "./index.ts";
import {submissions} from "./submissions.ts";
import {flags} from "./flags.ts";
import {changes} from "./changes.ts";
import {reports} from "./reports.ts";
import {textbookCost} from "./textbookCost.ts";

export const sections = pgTable('sections', {
    id: uuid().defaultRandom().primaryKey(),
    submissionId: uuid('submission_id').references(() => submissions.id).notNull(),
    schoolId: uuid('school_id').references(() => schools.id).notNull(),
    professorId: uuid('professor_id').references(() => professors.id).notNull(),
    className: varchar('class_name').notNull(),
    fullClassName: varchar('full_class_name').notNull(),
    professorName: varchar('professor_name').notNull(),
    reviewed: boolean().default(false).notNull(),
    dateCreated: timestamp('date_created').defaultNow().notNull(),
    classLength: smallint().notNull(),
    comments: varchar(),
    content: varchar().notNull(),
    textbookCost: textbookCost().notNull(),
    classId: uuid('class_id').references(() => classes.id),
}, table => ({
    searchIndex: index('sections_trgm_index').using('gin', sql`(
        class_name || ' ' || 
        full_class_name || ' ' ||
        professor_name
    ) gin_trgm_ops`),
}));

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