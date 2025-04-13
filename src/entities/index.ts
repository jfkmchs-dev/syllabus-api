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

export const typeDefs = [
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
    ClassResolvers
)