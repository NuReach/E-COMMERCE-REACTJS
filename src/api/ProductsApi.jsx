import axios from "axios"

const proxy = "http://localhost:3000"


export const getAllProductsApi = async () => {
    try {
        const respone = await axios.get(`${proxy}/api/products`);
        return respone.data;
    } catch (error) {
        throw error;
    }
}

export const getProductBySlug = async (id) => {
    try {
        const respone = await axios.get(`${proxy}/api/products/${id}`);
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        throw error;
    }
}