export const SchoolTypes = `#graphql

type School {
    id: ID!
    shortName: String!
    fullName: String!
}

extend type Query {
    school(id: ID!): School
    searchSchools(query: String!, skip: Int!, take: Int!): [School!]!
}

extend type Mutation {
    "Requires ADMIN"
    createSchool(id: ID!, shortName: String!, longName: String!): School
    
    "Requires ADMIN"
    updateSchool(id: ID!, shortName: String!, longName: String!): School
}
`