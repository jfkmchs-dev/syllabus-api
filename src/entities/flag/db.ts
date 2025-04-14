import {relations} from "drizzle-orm";
import {moderators} from "../moderator/db.ts";
import {sections} from "../section/db.ts";
import {pgTable, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {changeStatus} from "../changeStatus.ts";

export const flags = pgTable('flags', {
    id: uuid().defaultRandom().primaryKey(),
    reason: varchar().notNull(),
    date: timestamp().defaultNow(),
    moderatorId: uuid().references(() => moderators.id),
    sectionId: uuid().references(() => sections.id),
    status: changeStatus().default('PENDING')
});
export const flagRelations = relations(flags, ({one}) => ({
    moderator: one(moderators, {
        fields: [flags.moderatorId],
        references: [moderators.id]
    }),
    section: one(sections, {
        fields: [flags.sectionId],
        references: [sections.id]
    })
}));