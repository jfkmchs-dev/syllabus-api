import {pgEnum} from "drizzle-orm/pg-core";

export const textbookCost = pgEnum('textbook_cost', [
    'FREE',
    'CHEAP',
    'MODERATE',
    'EXPENSIVE'
]);