import axios from "axios";

const proxy = "http://localhost:3000"



export const placeOrderApi = async (state) => {
    try {
        const response = await axios.post(`${proxy}/api/orders/create`,{
            orderItems : state.orderItems,
            shippingAddress : state.shippingAddress,
            paymentMethod : state.paymentMethod,
            itemsPrice : state.itemsPrice,
            shippingPrice : state.shippingPrice,
            taxPrice : state.taxPrice,
            totalPrice : state.totalPrice
        },{
            headers : {
                Authorization : `Bearer ${state.token}`
            }
        }) ;
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getOrderByIdApi = async (id,token) => {
    try {
        const respone = await axios.get(`${proxy}/api/orders/${id}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return respone.data;
    } catch (error) {
        throw error;
    }
}