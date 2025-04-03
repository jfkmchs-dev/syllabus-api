import {SectionQueries} from "./queries.ts";
import {SectionMutations} from "./mutations.ts";

export const SectionResolvers = {
    Query: {
        ...SectionQueries
    },
    Mutation: {
        ...SectionMutations
    }
};