import { getDatabase, closeDBInstance } from "@/lib/db";

const getAllMessages = async (db) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT name, address, message FROM messages WHERE display = 1;';
        console.log(query);
        db.query(query, (err, rows, fields) => {
            if (err) {
                console.error("Error getting messages");
                return reject(err);
            }
            return resolve(rows);
        });
    });
}

export default async function handler(req, res) {
    const db = getDatabase();
    try {
        const messages = await getAllMessages(db);
        closeDBInstance(db);
        res.status(200).json(messages);
    } catch (e) {
        console.error(e);
        closeDBInstance(db);
        res.status(400).json(e.message);
    }

}