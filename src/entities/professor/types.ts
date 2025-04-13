export const ProfessorTypes = `#graphql

type Professor {
    id: ID!
    name: String!
    school: School!
    sections: [Section!]!
}

extend type Query {
    professor(id: ID!): Professor
    searchProfessors(query: String!, skip: Int!, take: Int!, schoolId: ID): [Professor!]!
}

extend type Mutation {
    "Requires MODERATOR"
    createProfessor(name: String!, schoolId: ID!): Professor
    
    "Requires MODERATOR"
    updateProfessor(id: ID!, name: String!, schoolId: ID!): Professor
    
    "Requires ADMIN"
    deleteProfessor(id: ID!): Boolean!
}
`