import {pgTable, smallint, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {moderators} from "../moderator/db.ts";
import {sections} from "../section/db.ts";
import {classes} from "../class/db.ts";
import {professors} from "../professor/db.ts";
import {relations} from "drizzle-orm";

// noinspection ES6PreferShortImport
import {textbookCost} from "../textbookCost.ts";
import {ChangeStatus, changeStatus} from "../changeStatus.ts";

export const changes = pgTable('changes', {
    id: uuid().defaultRandom().primaryKey(),
    reason: varchar().notNull(),
    date: timestamp().defaultNow(),
    moderatorId: uuid().notNull().references(() => moderators.id),
    sectionId: uuid().notNull().references(() => sections.id),
    status: changeStatus().default(ChangeStatus.PENDING),

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