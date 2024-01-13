export class AuthUser {
    constructor(
        public userId: string,
        private _token: string,
        private _expireDateStr: string
    ){}

    get token(): string {
        if (!this._token || new Date() > this.expirationDate) {
            return null;
        }
        return this._token;
    }

    get expirationDate(): Date {
        return new Date(+this._expireDateStr);
    }

}