import { UserModel } from "../../../domain/models/user"

export interface LoadUserByUsernameRepository {
    load(username: string): Promise<UserModel>
}
