export interface AuthResponse {
    idToken: string,
    email: string,
    localId: string,
    registered: boolean,
    refreshToken: string,
    expiresIn: string
}