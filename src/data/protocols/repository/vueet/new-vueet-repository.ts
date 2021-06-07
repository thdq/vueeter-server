import { AddVueetModel } from "@/domain/usecases/new-vueet"

export interface NewVueetRepository {
    create (newVueet: AddVueetModel): Promise<void>
}
