export class Session {
    constructor(
        public loggedIn: boolean,
        public username: string,
        public firstname: string,
        public lastname: string,
        public loginDate: string
    ) {}
}