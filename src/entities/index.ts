import {SubmissionTypes} from "./submission";
import {SectionTypes} from "./section";
import {SchoolTypes} from "./school/types.ts";
import {ReportTypes} from "./report/types.ts";
import {ProfessorTypes} from "./professor/types.ts";
import {ModeratorTypes} from "./moderator/types.ts";
import {FlagTypes} from "./flag/types.ts";
import {ClassTypes} from "./class/types.ts";
import {ChangeTypes} from "./change/types.ts";

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