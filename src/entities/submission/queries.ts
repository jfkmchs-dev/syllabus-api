import {ApolloServer} from "@apollo/server";
import {db, SEARCH_THRESHOLD} from "../../index.ts";
import {sections} from "../../db/schema";
import {and, eq, SQL, sql} from "drizzle-orm";

export const SubmissionQueries = {

}