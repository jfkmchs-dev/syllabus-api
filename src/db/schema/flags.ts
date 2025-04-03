import {relations} from "drizzle-orm";
import {moderators} from "./moderators.ts";
import {sections} from "./sections.ts";
import {pgTable, timestamp, uuid, varchar} from "drizzle-orm/pg-core";

export const flags = pgTable('flags', {
    id: uuid().defaultRandom().primaryKey(),
    reason: varchar().notNull(),
    date: timestamp().defaultNow(),
    moderatorId: uuid().references(() => moderators.id),
    sectionId: uuid().references(() => sections.id)
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