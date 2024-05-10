import { getDatabase, closeDBInstance } from "@/lib/db";
import { UserPost } from "@/lib/entities/UserPost";

const createMessage = async (db, queryParams) => {
    let userPost;
    try {
        userPost = new UserPost(queryParams.name, queryParams.city, queryParams.state, queryParams.message, queryParams.display);
    } catch(e) {
        throw new Error(e.message);
    }
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO messages (name, display, address, message) VALUES(\'${userPost.getName()}\', ${userPost.getDisplay()}, \'${userPost.getAddress()}\', \'${userPost.getMessage()}\')`;
        console.log(query);
        db.query(query, (err, rows, fields) => {
            if (err) {
                console.log(err);
                console.error("Error inserting message");
                return reject(err);
            }
            return resolve();
        });
    });
}

export default async function handler(req, res) {
    const db = getDatabase();
    try {
        await createMessage(db, req.query);
        closeDBInstance(db);
        res.status(200).json("Successfully uploaded post");
    } catch (e) {
        closeDBInstance(db);
        res.status(400).json(e.message);
    }
}