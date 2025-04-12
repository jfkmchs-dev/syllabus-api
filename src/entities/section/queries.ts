import {db, SEARCH_THRESHOLD} from "../../index.ts";
import {sections} from "../../db/schema";
import {and, eq, SQL, sql} from "drizzle-orm";
export const SectionQueries = {
    async section(_: any, args: {id: string}) {
        let result = await db.query.sections.findFirst({
            where: (sections, {eq}) => eq(sections.id, args.id),
        });

        if (!result) return null;

        return {
            ...result,
            dateCreated: result.dateCreated?.toISOString(),
        }
    },
    async searchSections(_: any, args: {
        query: string,
        skip: number,
        take: number,
        professorId?: string, // TODO: Make this a list of IDs
        schoolId?: string,
        classId?: string
    }) {
        let filters: SQL[] = [
            sql`${sections.content} <> ''`, // filter out empty content
            sql`${sections.classLength} > 0 AND ${sections.classLength} IS NOT NULL`, // filter out empty class length
            sql`${sections.textbookCost} IS NOT NULL`, // filter out empty textbook cost
        ];

        // if (args.professorId) filters.push(eq(sections.professorId, args.professorId)); // TODO
        if (args.schoolId) filters.push(eq(sections.schoolId, args.schoolId));
        if (args.classId) filters.push(eq(sections.classId, args.classId));

        let results = await db
            .select({
                id: sections.id,
                submissionId: sections.submissionId,
                schoolId: sections.schoolId,
                classId: sections.classId,
                reviewed: sections.reviewed,
                dateCreated: sections.dateCreated,
                classLength: sections.classLength,
                comments: sections.comments,
                content: sections.content,
                textbookCost: sections.textbookCost,

                // Ranking search using index
                rank: sql`word_similarity(
                    (
                        class_name || ' ' ||
                        full_class_name || ' ' ||
                        professor_name
                    ), 
                    ${args.query}
                ) AS rank`
            })
            .from(sections)
            .where(and(...filters))
            .groupBy(
                sections.id, sections.submissionId, sections.schoolId, sections.classId,
                sections.reviewed, sections.dateCreated, sections.classLength,
                sections.comments, sections.content, sections.textbookCost,
                sections.className, sections.fullClassName, sections.professorName
            )
            .having(sql`word_similarity(
                    (
                        class_name || ' ' ||
                        full_class_name || ' ' ||
                        professor_name
                    ), 
                    ${args.query}
                ) > ${SEARCH_THRESHOLD}`
            ) // minimum similarity threshold
            .orderBy(sql`rank DESC`)
            .offset(args.skip)
            .limit(args.take)
            .execute();

        results.map(({rank, ...rest}) => rest); // remove rank from the result
        return results;
    }
}