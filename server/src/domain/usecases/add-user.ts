import { UserModel } from "../models/user"

export interface AddUserModel {
    username: string
    birth_date: Date | string
    email: string
    name: string
    password: string
    accessToken?: string
}

export interface AddUser {
    add(user: AddUserModel): Promise<UserModel>
}
