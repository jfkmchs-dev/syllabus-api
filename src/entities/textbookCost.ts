import {pgEnum} from "drizzle-orm/pg-core";

export const textbookCost = pgEnum('textbook_cost', [
    'FREE',
    'CHEAP',
    'MODERATE',
    'EXPENSIVE'
]);

export enum TextbookCost {
    FREE = 'FREE',
    CHEAP = 'CHEAP',
    MODERATE = 'MODERATE',
    EXPENSIVE = 'EXPENSIVE'
}