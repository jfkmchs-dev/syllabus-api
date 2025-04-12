import {SectionQueries} from "./queries.ts";
import {SectionMutations} from "./mutations.ts";
import {db} from "../../index.ts";

export const SectionResolvers = {
    Query: {
        ...SectionQueries
    },
    Mutation: {
        ...SectionMutations
    },
    Section: {
        async submission(parent: any, _args: any, context: {moderatorUuid?: string}) {
            if (!context.moderatorUuid) return null;

            return await db.query.submissions.findFirst({
                where: (submissions, {eq}) => eq(submissions.id, parent.submissionId),
                columns: {
                    id: true,
                    dateSubmitted: true,
                    schoolId: true,
                    className: true,
                    professor: true,
                    classLength: true,
                    textbookCost: true,
                    description: true,
                    creatorEmail: true,
                    creatorName: true,
                    fileType: true,
                    sectionId: true
                }
            })
        },

        async school(parent: any) {
            return await db.query.schools.findFirst({
                where: (schools, {eq}) => eq(schools.id, parent.schoolId),
                columns: {
                    id: true,
                    shortName: true,
                    fullName: true,
                }
            });
        },

        async class(parent: any) {
            return await db.query.classes.findFirst({
                where: (classes, {eq}) => eq(classes.id, parent.classId),
                columns: {
                    id: true,
                    className: true,
                    fullClassName: true,
                    schoolId: true,
                }
            });
        },

        async professor(parent: any) {
            return await db.query.professors.findFirst({
                where: (professors, {eq}) => eq(professors.id, parent.professorId),
                columns: {
                    id: true,
                    name: true,
                    schoolId: true,
                }
            });
        },
    }
};