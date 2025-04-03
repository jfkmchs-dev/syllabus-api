import {SubmissionQueries} from "./queries.ts";
import {SubmissionMutations} from "./mutations.ts";

export const SubmissionResolvers = {
    Query: {
        ...SubmissionQueries
    },
    Mutation: {
        ...SubmissionMutations
    }
};