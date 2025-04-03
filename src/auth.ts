import {db} from "./index.ts";
import argon2 from "argon2";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import type {BaseContext, ContextFunction} from "@apollo/server";
import type {ExpressContextFunctionArgument} from "@apollo/server/express4";

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

export const authContext: ContextFunction<[ExpressContextFunctionArgument], BaseContext> = async ({ req }) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return {moderatorUuid: null};
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        return {moderatorUuid: decoded.id};
    } catch (e) {
        console.error(e);
        return {moderatorUuid: null};
    }
}