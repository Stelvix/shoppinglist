import type { User, UserUpdateValues } from "../types";
import type { CurrencyDTO } from "../types/currency";
import api from "./axios";

const UserService = {
    async getConnectedUserProfile(): Promise<User>{
        const { data } = await api.get<User>(`/users/me`);
        return data;
    },

    async updateConnectedUserProfile(details: UserUpdateValues): Promise<User>{
        const { data } = await api.put<User>(`/users/me`, details);
        return data;
    },

    async getAllCurrencies(): Promise<CurrencyDTO[]>{
        const { data } = await api.get<CurrencyDTO[]>(`/users/currencies`);
        return data;
    },

    async updateCurrency(code: string): Promise<User>{
        const { data } = await api.put<User>(`/users/me/currency`, { code });
        return data;
    }
}
export default UserService;