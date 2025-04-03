import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import * as schema from './db/schema';
import {app, httpServer, server} from "./server.ts";

export const SEARCH_THRESHOLD = 0.05;

export const db = drizzle(process.env.DATABASE_URL!, { schema });

await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
);

console.log(`🚀 Server ready at http://localhost:4000/`);