import fs from 'fs';

const jsonFile = './users.json';

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
        let watcher = fs.watch(jsonFile)
        watcher.on('change', () => {
            this.loadUsers();
        })
    }

    get(username) {
        return this.find(u => u.username === username);
    }

    add(username, fullName, password) {
        if (!this.get(username)) {
            this.push({username, fullName, password});
            this.saveUsers();
            return true;
        } else return false;
    }

    saveUsers() {
        try {
            fs.writeFileSync(jsonFile, JSON.stringify(this, null, 2));
        } catch (error) {
            console.error('Error saving users:', error);
        }
    }
}