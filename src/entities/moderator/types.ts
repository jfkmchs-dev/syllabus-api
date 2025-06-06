export const ModeratorTypes = `#graphql

type Moderator {
    id: ID!
    permissionLevel: String!
    username: String!
    successfulChangeCount: Int!
    changes: [Change!]!
    flags: [Flag!]!
}

extend type Query {
    "ADMIN only"
    moderator(id: ID!): Moderator
    
    "ADMIN only"
    searchModerators(query: String!, skip: Int!, take: Int!): [Moderator!]!
}

`