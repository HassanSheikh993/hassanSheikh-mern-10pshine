import { api } from "./api";

export const userLoginApi = async (email,password)=>{
    console.log(email,"    ",password)
  const response = await api.post("/user/login",{email:email,password:password});
  return response.data;
}


export const registerUserApi = async (userData) => {
    const response = await api.post("/user/register",{name:userData.name,email:userData.email,password:userData.password});
    return response.data;
    
}

export const logoutUser = async ()=>{
  const response = await api.post("/user/logout");
  return response.data;
}