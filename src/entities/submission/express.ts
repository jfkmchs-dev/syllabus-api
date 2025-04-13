import express from "express";
import fileUpload from 'express-fileupload';
import {isArray} from "lodash";
import {db, ROOT_FOLDER} from "../../index.ts";
import {submissions} from "./db.ts";
import {extension, lookup} from "mime-types";
import {TextbookCost} from "../../db/schema.ts";

const router: express.Router = express.Router();

interface NewSubmissionBody {
    schoolId: string;
    className: string;
    professor: string;
    classLength?: number;
    textbookCost?: TextbookCost;
    description?: string;
    creatorEmail?: string;
    creatorName?: string;
}

function isNewSubmissionBody(obj: any): obj is NewSubmissionBody {
    return typeof obj.schoolId === 'string' &&
        typeof obj.className === 'string' &&
        typeof obj.professor === 'string' &&
        (typeof obj.classLength === 'number' || typeof obj.classLength === 'undefined') &&
        (
            obj.textbookCost === 'FREE' ||
            obj.textbookCost === 'CHEAP' ||
            obj.textbookCost === 'MODERATE' ||
            obj.textbookCost === 'EXPENSIVE' ||
            typeof obj.textbookCost === 'undefined'
        ) &&
        (typeof obj.description === 'string' || typeof obj.description === 'undefined') &&
        (typeof obj.creatorEmail === 'string' || typeof obj.creatorEmail === 'undefined') &&
        (typeof obj.creatorName === 'string' || typeof obj.creatorName === 'undefined');
}

router.use(fileUpload());
router.post('/new', async (req, res) => {
    if (!req.body) {
        return res.status(400).send('No body provided');
    }

    if (!isNewSubmissionBody(req.body)) {
        return res.status(400).send('Invalid body');
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const result = await db.insert(submissions).values({
        schoolId: req.body.schoolId,
        className: req.body.className,
        professor: req.body.professor,
        classLength: req.body.classLength,
        textbookCost: req.body.textbookCost,
        description: req.body.description,
        creatorEmail: req.body.creatorEmail,
        creatorName: req.body.creatorName,
    }).returning({
        id: submissions.id
    });

    const file = req.files.file;

    if (isArray(file)) return res.status(400).send(file);

    console.log(file.mimetype)

    file.mv(ROOT_FOLDER + '/submissions/' + result[0].id + '.' + extension(file.mimetype), function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error (file moving)");
        }

        res.send({
            id: result[0].id
        });
    });
});

export {
    router as submissionRouter
};