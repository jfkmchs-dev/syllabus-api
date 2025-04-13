import {db} from "../../index.ts";
import {classes} from "./db.ts";
import {eq} from "drizzle-orm";

export const ClassMutations = {
    async createClass(_: any, args: { className: string; fullClassName: string; schoolId: string }) {
        const { className, fullClassName, schoolId } = args;

        return await db
            .insert(classes)
            .values({
                className,
                fullClassName,
                schoolId,
            })
            .returning()
            .then((res) => res[0]);
    },
    async updateClass(_: any, args: { id: string; className: string; fullClassName: string; schoolId: string }) {
        const { id, className, fullClassName, schoolId } = args;

        return await db
            .update(classes)
            .set({
                className,
                fullClassName,
                schoolId,
            })
            .where(eq(classes.id, id))
            .returning()
            .then((res) => res[0]);
    },
    async deleteClass(_: any, args: { id: string }) {
        const { id } = args;

        return await db
            .delete(classes)
            .where(eq(classes.id, id))
            .returning()
            .then((res) => res[0]);
    },
}