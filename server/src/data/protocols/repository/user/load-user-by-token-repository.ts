import { UserModel } from "../../../../domain/models/user"

export interface LoadUserByTokenRepository{
    loadByToken (value: string): Promise<UserModel>
}
