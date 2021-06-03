import { Meal } from "../../entity/Meal";

export interface DefaultResponse {
    status: boolean,
    message: string,
    id?: number,
    meals?: Meal[] ,
    data?: any[]
}