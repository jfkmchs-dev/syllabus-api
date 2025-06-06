export const FlagTypes = `#graphql

"A flag is a request for deletion of a section by a moderator"
type Flag {
    id: ID!
    reason: String!
    dateCreated: String!
    moderator: Moderator!
    section: Section!
    status: ChangeStatus!
}

extend type Query {
    "Requires ADMIN to access all flags, otherwise only flags for the current moderator"
    flag(id: ID!): Flag
    
    "Requires ADMIN to access all flags, otherwise only flags for the current moderator"
    flags(
        skip: Int!, 
        take: Int!, 
        schoolId: ID, 
        moderatorId: ID,
        status: ChangeStatus
    ): [Flag!]!
}

extend type Mutation {
    "Requires MODERATOR"
    createFlag(
        reason: String!
        sectionId: ID!
    ): Flag
    
    "Requires ADMIN"
    updateFlag(
        id: ID!
        reason: String
        moderatorId: ID
        sectionId: ID
    ): Flag
    
    "Requires ADMIN"
    deleteFlag(id: ID!): Boolean!
}
`