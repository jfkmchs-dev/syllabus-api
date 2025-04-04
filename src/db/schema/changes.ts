import {pgTable, smallint, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {moderators} from "./moderators.ts";
import {sections} from "./sections.ts";
import {classes} from "./classes.ts";
import {professors} from "./professors.ts";
import {relations} from "drizzle-orm";

import {textbookCost} from "./textbookCost.ts";

export const changes = pgTable('changes', {
    id: uuid().defaultRandom().primaryKey(),
    reason: varchar().notNull(),
    date: timestamp().defaultNow(),
    moderatorId: uuid().notNull().references(() => moderators.id),
    sectionId: uuid().notNull().references(() => sections.id),

    // section fields
    classId: uuid().notNull().references(() => classes.id),
    professorId: uuid().notNull().references(() => professors.id),
    classLength: smallint().notNull(),
    content: varchar().notNull(),
    textbookCost: textbookCost().notNull(),
});
export const changeRelations = relations(changes, ({one}) => ({
    moderator: one(moderators, {
        fields: [changes.moderatorId],
        references: [moderators.id]
    }),
    section: one(sections, {
        fields: [changes.sectionId],
        references: [sections.id]
    })
}));