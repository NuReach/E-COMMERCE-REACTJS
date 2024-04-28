import { proxy } from "@/utils/Utils";
import axios from "axios";

export const signinApi = async (state) => {
    try {
      const response = await axios.post(`${proxy}/api/users/signin`,{
        email : state.email,
        password : state.password
      })  
      return response.data;
    } catch (error) {
        throw error;
    }
}