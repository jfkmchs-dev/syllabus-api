import {pgEnum, pgTable, uuid, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {flags} from "./flags.ts";
import {changes} from "./changes.ts";

export const permissionLevel = pgEnum('permission_level', ['MODERATOR', 'ADMIN'])
export const moderators = pgTable('moderators', {
    id: uuid().defaultRandom().primaryKey(),
    permissionLevel: permissionLevel().notNull(),
    username: varchar().unique().notNull(),
    password: varchar().notNull(), // hashed
});
export const moderatorRelations = relations(moderators, ({many}) => ({
    changes: many(changes),
    flags: many(flags)
}));