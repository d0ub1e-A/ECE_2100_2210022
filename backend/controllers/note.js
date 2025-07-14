const db = require('../config/dbConfig');

// new note
async function newNote(req, res) {
    try {

        const { user_id } = req.user.user_info;
        const { title, note, tag_color } = req.body;
        let { tag } = req.body;

        if (!title) {
            return res.status(400).json({ error: "provide all the request data" });
        }

        await db.query(
            `INSERT INTO "note" (user_id, title, note, tag, tag_color) VALUES ($1, $2, $3, COALESCE(NULLIF($4, ''), 'untagged'), $5)`,
            [user_id, title, note, tag, tag_color]
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
            `SELECT note_id, title, tag_color, note, tag, pinned, created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' AS created_at FROM "note" WHERE user_id = $1 ORDER BY note_id DESC`,
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
            `SELECT note_id, title, note, tag, pinned, created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' AS created_at FROM "note" WHERE user_id = $1 AND note_id = $2`,
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
        const { title, note, tag, tag_color } = req.body;

        const result = await db.query(
            `UPDATE "note" SET title = COALESCE($1, title), note = COALESCE($2, note), tag = COALESCE($3, tag), tag_color = COALESCE($4, tag_color) WHERE note_id = $5 AND user_id = $6`,
            [title, note, tag, tag_color, id, user_id]
        );

        if (result.rowCount === 0) {
            return res.sendStatus(404);
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
            `DELETE FROM "note" WHERE note_id = $1 AND user_id = $2`,
            [id, user_id]
        );

        if (result.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.sendStatus(200);

    } catch (error) {
        console.error("note deletion error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// pin/unpin a note
async function pinNote(req, res) {
    try {

        const { user_id } = req.user.user_info;
        const { id } = req.params;

        const result = await db.query(
            `UPDATE "note" SET pinned = NOT pinned WHERE note_id = $1 AND user_id = $2`,
            [id, user_id]
        );

        if (result.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.sendStatus(200);

    } catch (error) {
        console.error("note pin/unpin error: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    newNote,
    allNote,
    oneNote,
    updateNote,
    deleteNote,
    pinNote
}