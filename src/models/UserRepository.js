import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export default class UserRepository {
    constructor() {
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    async get(username) {
        const [rows] = await this.connection.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    async add(username, fullName, password) {
        const user = await this.get(username);
        if (!user) {
            await this.connection.execute('INSERT INTO users (username, fullName, password) VALUES (?, ?, ?)', [username, fullName, password]);
            return true;
        } else {
            return false;
        }
    }
}