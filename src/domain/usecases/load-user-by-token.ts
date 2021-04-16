import { UserModel } from "../../data/usecases/add-user/db-add-user.protocol"

export interface loadUserByToken {
    load (token: string): Promise<UserModel>
}
