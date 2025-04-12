export const SchoolTypes = `#graphql

type School {
    id: ID!
    shortName: String!
    fullName: String!
    classes: [Class!]!
    professors: [Professor!]!
    sections: [Section!]!
    submissions: [Submission!]
}

extend type Query {
    school(id: ID!): School
    searchSchools(query: String!, skip: Int!, take: Int!): [School!]!
}

extend type Mutation {
    "Requires ADMIN"
    createSchool(shortName: String!, longName: String!): School
    
    "Requires ADMIN"
    updateSchool(id: ID!, shortName: String!, longName: String!): School
}
`