import axios from "axios"

export const getAllProductsApi = async () => {
    try {
        const respone = await axios.get("http://localhost:3000/api/products");
        return respone.data;
    } catch (error) {
        throw error;
    }
}

export const getProductBySlug = async (slug) => {
    try {
        const respone = await axios.get(`http://localhost:3000/api/products/${slug}`);
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        throw error;
    }
}