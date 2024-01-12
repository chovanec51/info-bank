export class AuthRequest {
    returnSecureToken: boolean = true;
    constructor(
        public email: string,
        public password: string
    ){}
}