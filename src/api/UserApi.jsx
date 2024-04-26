import axios from "axios";
const proxy = "http://localhost:3000";
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