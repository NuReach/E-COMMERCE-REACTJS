import { proxy } from "@/utils/Utils";
import axios from "axios"



export const getAllProductsApi = async () => {
    try {
        const respone = await axios.get(`${proxy}/api/products`);
        return respone.data;
    } catch (error) {
        throw error;
    }
}

export const getProductByID = async (id) => {
    try {
        const respone = await axios.get(`${proxy}/api/products/${id}`);
        return respone.data;
    } catch (error) {
        throw error;
    }
}