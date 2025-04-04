export const ClassTypes = `#graphql

type Class {
    id: ID!
    className: String!
    fullClassName: String!
    schoolId: ID!
}

extend type Query {
    class(id: ID!): Class
    searchClasses(query: String!, skip: Int!, take: Int!, schoolId: ID): [Class!]!
}

extend type Mutation {
    "Requires MODERATOR"
    createClass(className: String!, fullClassName: String!, schoolId: ID!): Class
    
    "Requires MODERATOR"
    updateClass(id: ID!, className: String!, fullClassName: String!, schoolId: ID!): Class
    
    "Requires ADMIN"
    deleteClass(id: ID!): Boolean!
}

`