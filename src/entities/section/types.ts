export const SectionTypes = `#graphql
    type Section {
        id: ID!
        # Null if not authorized
        submission: Submission
        school: School!
        class: Class!
        professor: Professor!
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
            submissionId: ID!
            classId: ID!
            professorId: ID!
            
            "Markdown Content. Optional, but sections without content will not show up in search results."
            content: String
            
            "Optional, but sections without content will not show up in search results."
            classLength: Int
            
            "Optional, but sections without content will not show up in search results."
            textbookCost: TextbookCost
        ): Section
        
        updateSectionMetadata(
            sectionId: ID!
            classId: ID
            professorId: ID
            classLength: Int
            comments: String
            content: String
            textbookCost: TextbookCost
        ): Section!
        
        updateSectionContent(
            sectionId: ID!
            newContent: String!
        ): Section!
    
        deleteSection(id: ID!): Boolean!
    }
`