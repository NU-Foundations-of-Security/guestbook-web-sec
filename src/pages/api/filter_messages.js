import { getDatabase, closeDBInstance } from "@/lib/db";

const filter = async (db, queryParams) => {
    const nameQuery = queryParams.name;
    if (nameQuery == '') { // No name provided
        return [];
    }

    return new Promise((resolve, reject) => {
        const query = `SELECT message FROM messages WHERE name = \'${nameQuery}\'`;
        console.log(query);
        db.query(query, (err, rows, fields) => {
            if (fields.length >= 1 && fields[0].constructor == Array) {
                let new_rows = []
                for (let i = 0; i < fields.length; i++) {
                    if (fields[i] != undefined && rows[i][0] != undefined) {
                        for (let j = 0; j < rows[i].length; j++) {
                            new_rows.push(rows[i][j]);
                        }
                    }
                }
                rows = new_rows;
            }
            if (err) {
                console.error("Error getting messages");
                return reject(err);
            }
            return resolve(rows.map(r => r.message));
        });
    });
};

export default async function handler(req, res) {
    const db = getDatabase();
    try {
        const messages = await filter(db, req.query);
        closeDBInstance(db);
        res.status(200).json(messages);
    } catch (e) {
        console.error(e);
        closeDBInstance(db);
        res.status(400).json(e.message);
    }
};