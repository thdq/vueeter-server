export interface UpdateAccessTokenRepository {
    updateAcessToken (id: string, token: string): Promise<void>
}
