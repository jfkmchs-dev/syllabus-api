import 'dotenv/config';
import {drizzle} from 'drizzle-orm/bun-sql';
import * as schema from './db/schema';
import {httpServer} from "./server.ts";
import { SQL } from 'bun';

console.log(SQL);
const client = new SQL(process.env.DATABASE_URL!)
export const db = drizzle({schema, client});

export const SEARCH_THRESHOLD = 0.05;

await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
);

console.log(`🚀 Server ready at http://localhost:4000/`);