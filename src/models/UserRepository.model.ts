import User from "./user.interface";

export default class UserRepository {
    private jsonFile: string;
    private users: User[];

    constructor(jsonFile: string) {
        this.jsonFile = jsonFile
        this.users = new Array<User>
    }

}