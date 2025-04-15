export const SubmissionTypes = `#graphql
type Submission {
    id: ID!
    dateSubmitted: String!
    className: String!
    professor: String!
    classLength: Int
    textbookCost: TextbookCost
    description: String
    creatorEmail: String
    creatorName: String
    fileType: String!
    section: Section
    school: School!
}

extend type Query {
    "Gets a submission. Requires MODERATOR"
    submission(id: ID!): Submission
    
    "Gets all submissions. Requires MODERATOR"
    submissions: [Submission!]
    
    "Gets all submissions that do not have a section. Requires MODERATOR"
    outstandingSubmissions: [Submission!]
}

extend type Mutation {
    "Deletes a submission. Requires MODERATOR privilege, true if deletion successful, err if not"
    deleteSubmission(id: ID!): Boolean
}
`