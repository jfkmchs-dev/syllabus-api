export const ChangeTypes = `#graphql

type Change {
    id: ID!
    reason: String!
    date: String!
    moderatorId: ID!
    sectionId: ID!
    classId: ID!
    professorId: ID!
    classLength: Int!
    content: String!
    textbookCost: TextbookCost!
}

extend type Query {
    change(id: ID!): Change
    searchChanges(
        query: String!
        skip: Int!
        take: Int!
        sectionId: ID
        classId: ID
        professorId: ID
    ): [Change!]!
}

extend type Mutation {
    "Suggests a change to a syllabus, requires MODERATOR role"
    createChange(
        id: ID!
        reason: String!
        date: String!
        sectionId: ID!
        classId: ID!
        professorId: ID!
        classLength: Int!
        content: String!
        textbookCost: TextbookCost!
    ): Change
    
    "Updates a change. Requires MODERATOR role, and the user must be the author of the change."
    updateChange(
        reason: String!
        date: String!
        sectionId: ID!
        classId: ID!
        professorId: ID!
        classLength: Int!
        content: String!
        textbookCost: TextbookCost!
    ): Change
    
    "Requires MODERATOR role, and the user must be the author of the change."
    deleteChange(id: ID!): Boolean!
        
    "Requires ADMIN"
    denyChange(id: ID!): Boolean!
    
    "Requires ADMIN"
    approveChange(id: ID!): Boolean!
}

`