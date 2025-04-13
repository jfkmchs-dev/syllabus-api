import 'dotenv/config';
import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "../db/schema.ts";
import argon2 from "argon2";

const db = drizzle(process.env.DATABASE_URL!, { schema });

let username = Bun.argv[2];
let password = Bun.argv[3];
let permissionLevel = Bun.argv[4] || "MODERATOR";

if (!username || !password) {
    console.error("Please provide a username and password.");
    process.exit(1);
}

if (!["MODERATOR", "ADMIN"].includes(permissionLevel)) {
    console.error("Permission level must be either MODERATOR or ADMIN.");
    process.exit(1);
}

const existing = await db.query.moderators.findFirst({
    where: (moderators, {eq}) => eq(moderators.username, username),
});

if (existing) {
    console.error("Username already exists.");
    process.exit(1);
}

let hashedPassword = await argon2.hash(password);

// @ts-ignore
const result = await db.insert(schema.moderators).values({
    username: username as 'MODERATOR' | 'ADMIN',
    password: hashedPassword,
    permissionLevel,
}).returning();

console.log("Moderator created:", result);