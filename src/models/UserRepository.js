import fs from 'fs';

const jsonFile = './data/users.json';

export default class UserRepository extends Array {

    constructor() {
        super();
        this.loadUsers();
        this.watchFile();
    }

    loadUsers() {
        try {
            const raw_data = fs.readFileSync(jsonFile);
            const users = new Set(JSON.parse(raw_data.toString()));
            this.length = 0;
            this.push(...users);
        } catch (error) {
            console.error('Error loading users:', error);
            this.length = 0;
        }
    }

    watchFile() {
        fs.watch(jsonFile, (eventType, filename) => {
            if (eventType === 'change') {
                console.log(`File ${filename} has been changed. Reloading users...`);
                this.loadUsers();
            }
        });
    }

    get(username) {
        return this.find(u => u.username === username);
    }
}