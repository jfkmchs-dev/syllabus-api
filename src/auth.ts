import {db} from "./index.ts";
import argon2 from "argon2";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import type {BaseContext, ContextFunction} from "@apollo/server";
import type {ExpressContextFunctionArgument} from "@apollo/server/express4";
import {moderators} from "./db/schema";
import {eq} from "drizzle-orm";

export interface AuthContext {
    uuid: string | null;
    authLevel: 'ADMIN' | 'MODERATOR' | null;
}

export async function generateToken(email: string, password: string) {
    const result = await db.query.moderators.findFirst({
        where: (moderators, { eq }) => eq(moderators.username, email),
    });

    if (!result) {
        return null;
    }

    const isValidPassword = await argon2.verify(result.password, password);

    if (!isValidPassword) {
        return null;
    }

    return jwt.sign({id: result.id}, process.env.JWT_SECRET!, {expiresIn: "2h"});
}

export async function getModeratorID(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (e) {
        return null;
    }
}

export const dummyAuthContext: ContextFunction<[ExpressContextFunctionArgument], AuthContext> = async ({ req }) => {
    return {
        uuid: null,
        authLevel: null
    }
}

export const authContext: ContextFunction<[ExpressContextFunctionArgument], AuthContext> = async ({ req }) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return { uuid: null, authLevel: null};
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        const result = (await db.select({
            authLevel: moderators.permissionLevel
        })
            .from(moderators)
            .where(eq(moderators.id, decoded.id)))[0]
        if (!result) {
            return { uuid: null, authLevel: null};
        }
        return { uuid: decoded.id, authLevel: result.authLevel};
    } catch (e) {
        return { uuid: null, authLevel: null};
    }
}