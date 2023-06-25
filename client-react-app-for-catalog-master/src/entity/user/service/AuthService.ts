import {AxiosResponse} from "axios"
import $api from "../../../app/constant/GlobalConstants";
import {AuthResponse} from "../../GlobalTypes";

export default class AuthService {

    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`/Login`, {
            "login": login,
            "password": password
        })
    }
}