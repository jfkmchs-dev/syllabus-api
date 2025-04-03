export const SectionTypes = `#graphql
    type Section {
        id: ID!
        # Null if not authorized
        submissionId: ID
        schoolId: ID!
        classId: ID!
        reviewed: Boolean!
        dateCreated: String!
        classLength: Int!
        comments: String
        content: String!
        textbookCost: TextbookCost!
    }
    
    extend type Query {
        section(id: ID!): Section
        searchSections(
            query: String!
            skip: Int!
            take: Int!
            professorId: ID
            schoolId: ID
            classId: ID
        ): [Section!]!
    }
    
    extend type Mutation {
        "Creates a new section. Null if not authorized."
        createSection(
            submissionId: ID
            schoolId: ID!
            classId: ID!
            classLength: Int!
            comments: String
            content: String!
            textbookCost: TextbookCost!
        ): Section
        
        "Creates a new section from a submission. Null if not authorized."
        createSectionFromSubmission(
            submissionId: ID!
            schoolId: ID!
            classId: ID!
            content: String!
            fullClassName: String!
            
        ): Section
        
        updateSection(
            submissionId: ID
            schoolId: ID!
            classId: ID!
            classLength: Int!
            comments: String
            content: String!
            textbookCost: TextbookCost!
        ): Section!
    
        deleteSection(id: ID!): Boolean!
    }
`