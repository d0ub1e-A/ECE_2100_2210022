const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');

// new note
async function newNote(req, res) {
    try {

        const { user_id } = req.user.user_info;
        const { title, note } = req.body;
        let { tag } = req.body;

        if (!title || !note) {
            return res.status(400).json({ error: "provide all the request data" });
        }

        if (!tag) {
            tag = null;
        }

        await db.query(
            `INSERT INTO "note" (user_id, title, note, tag) VALUES ($1, $2, $3, $4)`,
            [user_id, title, note, tag]
        );

        res.sendStatus(201);

    } catch (error) {
        console.error("note creation error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// all notes
async function allNote(req, res) {
    try {

        const { user_id } = req.user.user_info;

        const result = await db.query(
            `SELECT note_id, title, note, tag, created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' AS created_at FROM "note" WHERE user_id = $1`,
            [user_id]
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error("all note get error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// one note
async function oneNote(req, res) {
    try {

        const { user_id } = req.user.user_info;
        const { id } = req.params;

        const result = await db.query(
            `SELECT note_id, title, note, tag, created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' AS created_at FROM "note" WHERE user_id = $1 AND note_id = $2`,
            [user_id, id]
        );

        if (result.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("note get by id error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// update note
async function updateNote(req, res) {
    try {

        const { user_id } = req.user.user_info;
        const { id } = req.params;
        const { title, note } = req.body;

        const result = await db.query(
            `SELECT 1 AS ok FROM "note" WHERE note_id = $1 AND user_id = $2`,
            [id, user_id]
        );

        if (result.rowCount === 0) {
            return res.sendStatus(404);
        }

        // title update
        if (title) {
            await db.query(
                `UPDATE "note" SET title = $1 WHERE note_id = $2`,
                [title, id]
            );
        }

        // note update
        if (note) {
            await db.query(
                `UPDATE "note" SET note = $1 WHERE note_id = $2`,
                [note, id]
            );
        }

        res.sendStatus(200);

    } catch (error) {
        console.error("note update error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// delete note
async function deleteNote(req, res) {
    try {

        const { user_id } = req.user.user_info;
        const { id } = req.params;

        const result = await db.query(
            `SELECT 1 AS ok FROM "note" WHERE note_id = $1 AND user_id = $2`,
            [id, user_id]
        );

        if (result.rowCount === 0) {
            return res.sendStatus(404);
        }

        await db.query(
            `DELETE FROM "note" WHERE note_id = $1`,
            [id]
        );

        res.sendStatus(200);

    } catch (error) {
        console.error("note deletion error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    newNote,
    allNote,
    oneNote,
    updateNote,
    deleteNote
}