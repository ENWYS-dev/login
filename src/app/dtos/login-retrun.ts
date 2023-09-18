export class LoginReturn {
    constructor(
        public username: string,
        public sessionId: string,
        public success: boolean,
        public redirect: string,
        public error: string
    ) {}
}