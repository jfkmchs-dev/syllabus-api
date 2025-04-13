import {db} from "../../index.ts";
import {sections, TextbookCost} from "../../db/schema.ts";
import {GraphQLError} from "graphql/error";
import type {AuthContext} from "../../auth.ts";
import {eq} from "drizzle-orm";

export const SectionMutations = {
    async createSection(_: any, args: {
        submissionId: string,
        classId: string,
        professorId: string,
        classLength?: number,
        content?: string,
        textbookCost?: 'FREE' | 'CHEAP' | 'MODERATE' | 'EXPENSIVE'
    }, context: AuthContext) {
        // if (!context.uuid) return null;

        let submission = await db.query.submissions.findFirst({
            where: (submissions, {eq}) => eq(submissions.id, args.submissionId),
        });

        if (!submission) throw new GraphQLError("Submission not found");

        let $class = await db.query.classes.findFirst({
            where: (classes, {eq}) => eq(classes.id, args.classId),
        });

        if (!$class) throw new GraphQLError("Class not found");

        let professor = await db.query.professors.findFirst({
            where: (professors, {eq}) => eq(professors.id, args.professorId),
        });

        if (!professor) throw new GraphQLError("Professor not found");

        // @ts-ignore
        let result = await db.insert(sections).values({
            schoolId: $class.schoolId,
            classId: args.classId,
            classLength: args.classLength || submission.classLength,
            comments: submission.description,
            content: args.content,
            textbookCost: args.textbookCost || submission.textbookCost,
            className: $class.className,
            fullClassName: $class.fullClassName,
            professorId: professor.id,
            professorName: professor.name,
            submissionId: args.submissionId,
            dateCreated: new Date()
        }).returning()[0];

        return {
            ...result,
            dateCreated: result.dateCreated.toISOString(),
        }
    },

    async updateSectionMetadata(_: any, args: {
        sectionId: string,
        classId?: string,
        professorId?: string,
        classLength?: number,
        comments?: string,
        content?: string,
        textbookCost?: TextbookCost
    }, context: AuthContext) {
        // if (!context.uuid) return null;
        if (!args.classId && !args.professorId && !args.classLength && !args.comments && !args.content && !args.textbookCost) {
            throw new GraphQLError("Nothing to update");
        }
        // @ts-ignore
        // if (!context.authLevel != 'ADMIN') return null;

        let result = await db.update(sections).set({
            classId: args.classId,
            professorId: args.professorId,
            classLength: args.classLength,
            comments: args.comments,
            content: args.content,
            textbookCost: args.textbookCost
        })
            .where(eq(sections.id, args.sectionId)).returning();

        if (!result[0]) throw new GraphQLError("Section not found");

        return {
            ...result[0],
            dateCreated: result[0].dateCreated.toISOString(),
        }
    },

    async updateSectionContent(_: any, args: {
        sectionId: string,
        newContent: string
    }, context: AuthContext) {
        if (!context.uuid) return null;

        let result = await db.update(sections).set({
            content: args.newContent
        })
            .where(eq(sections.id, args.sectionId)).returning();

        if (!result[0]) throw new GraphQLError("Section not found");

        return {
            ...result[0],
            dateCreated: result[0].dateCreated.toISOString(),
        }
    },
};