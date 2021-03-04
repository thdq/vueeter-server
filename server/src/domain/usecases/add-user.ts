import { UserModel } from "../models/user"

export interface AddUserModel {
    username: string
    birth_date: Date
    email: string
    name: string
    password: string
}

export interface AddUser {
    add(user: AddUserModel): UserModel
}
