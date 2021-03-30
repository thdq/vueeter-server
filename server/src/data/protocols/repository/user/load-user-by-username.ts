import { UserModel } from "../../../../domain/models/user"

export interface LoadUserByUsernameRepository {
    loadByUsername (username: string): Promise<UserModel>
}
