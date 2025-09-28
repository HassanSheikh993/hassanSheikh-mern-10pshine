import { useEffect, useState } from "react";
import { userLoginApi } from "../../services/authService";

export const Login = ()=>{
    const [userData,setUserData] = useState({
        email:"",
        password:""
    })
    const [showPassword,setShowPassword] = useState(false);
    const [loginMessage,setLoginMessage] = useState("");

    function handleOnChange(e){
        setUserData({...userData,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        console.log(userData)
    },[userData])
    
    function handlePasswordToggle(){
        setShowPassword(!showPassword)
    }

    async function handleFormSubmit(e){
     e.preventDefault()
     try{
        const result = await userLoginApi(userData.email,userData.password);
     setLoginMessage(result.message);
     }catch(error){
        if(error || error.response.status===401 || error.response.status===400 || error.response.status===404){
            setLoginMessage(error.response.data.message);
        }else{
            setLoginMessage("SomeThing Went Wrong Try Again")
        }
     }
    }

    return(
        <>
        <form action="" onSubmit={handleFormSubmit}>
            <label htmlFor="">Email</label>
            <input type="email" name="email" value={userData.email} onChange={handleOnChange} placeholder="Enter Email" required />

            <label htmlFor="">Password</label>
            <input type={showPassword ? "text" : "password"} name="password" value={userData.password} onChange={handleOnChange} placeholder="Enter password" required />
            <button type="button" onClick={handlePasswordToggle}>{showPassword?"Hide":"Show"}</button>

            <input type="submit" />

        </form>
        {loginMessage && <p>{loginMessage}</p>}
        </>
    )
}