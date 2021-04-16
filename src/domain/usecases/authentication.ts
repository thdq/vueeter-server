export interface AuthenticationModel {
    username: string
    password: string
}

export interface Authentication {
    auth (authentication: AuthenticationModel): Promise<string>
}
