import {relations} from "drizzle-orm";
import {schools} from "../school/db.ts";
import {pgTable, uuid, varchar} from "drizzle-orm/pg-core";
import {sections} from "../../db/schema";

export const professors = pgTable('professors', {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    schoolId: uuid('school_id').references(() => schools.id).notNull()
})

export const professorRelations = relations(professors, ({many, one}) => ({
    sections: many(sections),
    school: one(schools, {
        fields: [professors.schoolId],
        references: [schools.id]
    })
}));