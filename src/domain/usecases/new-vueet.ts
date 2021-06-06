export interface AddVueetModel {
    text: string
    source: string
    in_reply_to_vueet_id?: number
    in_reply_to_user_id?: number
    user_id: string 
}

export interface NewVueet {
    create (vueet: AddVueetModel): Promise<void>
}
