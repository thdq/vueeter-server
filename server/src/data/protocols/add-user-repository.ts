import { UserModel } from "@/domain/models/user"
import { AddUserModel } from "@/domain/usecases/add-user"

export interface AddUserRepository {
    add (user: AddUserModel): Promise<UserModel>
}
