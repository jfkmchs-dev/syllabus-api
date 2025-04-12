import {integer, pgEnum, pgTable, uuid, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {flags} from "../flag/db.ts";
import {changes} from "../change/db.ts";

export const permissionLevel = pgEnum('permission_level', ['MODERATOR', 'ADMIN'])
export const moderators = pgTable('moderators', {
    id: uuid().defaultRandom().primaryKey(),
    permissionLevel: permissionLevel().notNull(),
    username: varchar().unique().notNull(),
    password: varchar().notNull(), // hashed
    successfulChangeCount: integer().default(0),
});
export const moderatorRelations = relations(moderators, ({many}) => ({
    changes: many(changes),
    flags: many(flags)
}));