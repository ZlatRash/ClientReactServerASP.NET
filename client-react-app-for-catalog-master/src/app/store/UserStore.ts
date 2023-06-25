import {makeAutoObservable} from "mobx";
import {User} from "../../entity/user/User";
import AuthService from "../../entity/user/service/AuthService";
import axios from "axios";
import  {api_url} from "../constant/GlobalConstants";
import {AuthResponse} from "../../entity/GlobalTypes";

class UserStore {

    user = {} as User;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: User) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    public async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            if (response.data.status === 0) {
                localStorage.setItem('token', response.data.token);
                this.setAuth(true);
                this.setUser(response.data.user);
            } else {
                alert("Пользователь не зарегистрирован")
            }


        } catch (e) {
            // console.log(e.response?.data?.message);
        }
    }

    public logout() {
        localStorage.removeItem('token');
        this.setAuth(false);
        this.setUser({} as User);
    }

    public async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${api_url}/refresh`, {withCredentials: true})
            if (response.data.status === 0) {
                localStorage.setItem('token', response.data.token);
                this.setAuth(true);
                this.setUser(response.data.user);
            } else {
                alert("Пользователь не зарегистрирован")
            }
            // localStorage.setItem('token', response.data.accessToken);

        } catch (e) {
            // console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}

export const userStore = new UserStore();