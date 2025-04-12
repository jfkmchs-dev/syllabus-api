export const SubmissionTypes = `#graphql
type Submission {
    id: ID!
    dateSubmitted: String!
    schoolId: ID!
    className: String!
    professor: String!
    classLength: Int
    textbookCost: TextbookCost
    description: String
    creatorEmail: String
    creatorName: String
    fileType: String!
    section: Section
}

extend type Query {
    "Gets a submission. Requires MODERATOR"
    submission(id: ID!): Submission
    
    "Gets all submissions. Requires MODERATOR"
    submissions: [Submission!]
    
    outstandingSubmissions: [Submission!]
}

extend type Mutation {
    "Deletes a submission. Requires MODERATOR privilege, true if deletion successful, err if not"
    deleteSubmission(id: ID!): Boolean
}
`