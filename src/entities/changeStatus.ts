import {pgEnum} from "drizzle-orm/pg-core";

export enum ChangeStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DENIED = 'DENIED'
}

export const changeStatus = pgEnum('change_status', [
    'PENDING',
    'APPROVED',
    'DENIED'
]);