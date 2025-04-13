import {pgTable, uuid, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

import {schools} from "../school/db.ts";
import {sections} from "../section/db.ts";

export const classes = pgTable('classes', {
    id: uuid().defaultRandom().primaryKey(),
    className: varchar('class_name').notNull(),
    fullClassName: varchar('full_class_name').notNull(),
    schoolId: uuid('school_id').references(() => schools.id).notNull(),
});

export const classRelations = relations(classes, ({ one, many }) => ({
    school: one(schools, {
        fields: [classes.schoolId],
        references: [schools.id]
    }),
    sections: many(sections),
}));