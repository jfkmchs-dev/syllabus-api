export const ReportTypes = `#graphql

type Report {
    id: ID!
    type: String!
    title: String!
    body: String!
    dateCreated: String!
    authorEmail: String!
    section: Section!
}

extend type Query {
    "Requires ADMIN"
    report(id: ID!): Report
    
    "Requires ADMIN"
    getReports: [Report!]!
}

extend type Mutation {
    createReport(
        type: String!
        title: String!
        body: String!
        authorEmail: String!
        sectionId: ID!
    ): Report
    
    "Requires ADMIN"
    deleteReport(id: ID!): Boolean!
}
`