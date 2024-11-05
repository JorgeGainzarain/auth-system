import UserRepository from "./UserRepository.js";

export default class AuthService {
    static users = new UserRepository();

    static signin(username, password) {
        const user = this.users.get(username);
        return user !== undefined && user.password === password;
    }

}