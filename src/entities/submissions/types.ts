export const SubmissionTypes = `#graphql
type Submission {
    id: ID!
    dateSubmitted: String!
    schoolId: String!
    className: String!
    professorName: String!
    classLength: Int
    textbookCost: TextbookCost
    description: String
    creatorEmail: String
    creatorName: String
    fileType: String!
    sectionId: String
}
`