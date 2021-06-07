import { UserModel } from "./user"

export interface VueetModel {
    id: string
    text: string
    source: string
    in_reply_to_vueet_id: string 
    in_reply_to_user_id: string
    created_at: Date
    userId: string
    UserFavouriteds?: UserModel[]
    UserRevueeteds?: UserModel[]
    User?: UserModel
}
