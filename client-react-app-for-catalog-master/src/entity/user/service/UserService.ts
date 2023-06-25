import {AxiosResponse} from "axios";
import $api from "../../../app/constant/GlobalConstants";

export default class UserService {
    static async fetchUsers():Promise<AxiosResponse<string[]>> {
        return $api.get("/User/GetUsers")
    }
}