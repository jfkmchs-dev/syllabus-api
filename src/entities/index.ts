import {SubmissionResolvers, SubmissionTypes} from "./submission";
import {SectionResolvers, SectionTypes} from "./section";
import {SchoolTypes} from "./school/types.ts";
import {ReportTypes} from "./report/types.ts";
import {ProfessorTypes} from "./professor/types.ts";
import {ModeratorTypes} from "./moderator/types.ts";
import {FlagTypes} from "./flag/types.ts";
import {ClassTypes} from "./class/types.ts";
import {ChangeTypes} from "./change/types.ts";
import lodash from "lodash";
import {SchoolResolvers} from "./school/resolvers.ts";
import {ClassResolvers} from "./class/resolvers.ts";
import {ProfessorResolvers} from "./professor/resolvers.ts";
import {ModeratorResolvers} from "./moderator/resolvers.ts";
import {ChangeResolvers} from "./change/resolvers.ts";

const GlobalTypes = `#graphql
enum TextbookCost {
    FREE,
    CHEAP,
    MODERATE,
    EXPENSIVE
}

type Query {
    _empty: String
}

type Mutation {
    _empty: String
}
`

export const typeDefs = [
    GlobalTypes,
    SubmissionTypes,
    SectionTypes,
    SchoolTypes,
    ReportTypes,
    ProfessorTypes,
    ModeratorTypes,
    FlagTypes,
    ClassTypes,
    ChangeTypes
];

export const resolvers = lodash.merge(
    {
        Query: {
            _empty: () => null
        },
        Mutation: {
            _empty: () => null
        }
    },
    SubmissionResolvers,
    SectionResolvers,
    SchoolResolvers,
    ClassResolvers,
    ProfessorResolvers,
    ModeratorResolvers,
    ChangeResolvers,
)