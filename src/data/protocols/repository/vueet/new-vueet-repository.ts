import { VueetModel } from "@/domain/models/vueet"
import { AddVueetModel } from "@/domain/usecases/new-vueet"

export interface NewVueetRepository {
    create (newVueet: AddVueetModel): Promise<VueetModel>
}
