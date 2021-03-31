import { UserModel } from "../../data/usecases/add-user/db-add-user.protocol"
import { HttpRequest } from "../../presentation/protocols"

export interface loadUserByToken {
    load (httpRequest: HttpRequest): Promise<UserModel>
}
