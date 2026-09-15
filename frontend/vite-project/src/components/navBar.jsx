import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/navBar.css"
import { logoutUser } from "../services/authService";

export function Nav(){
    const navigate = useNavigate();
    const [isRotating, setIsRotating] = useState(false);
    
    function handleOnClick(){

        setIsRotating(true);
        
        setTimeout(() => {
            navigate("/createNewNote");
            setTimeout(() => setIsRotating(false), 100);
        }, 500);
    }

    function handleNavigateHome(){
        navigate("/");
    }
    async function handleLogOut(){
        const res = await logoutUser();
        if(res){
            navigate("/register")
        }
    }
    
    return(
        <div className="navBar_container">
            <p className="navBar_title" onClick={handleNavigateHome}>ThinkInk</p>
            <img className="logout_profile_image" src="https://cdn-icons-png.flaticon.com/512/13403/13403145.png" alt="no pic available" onClick={handleLogOut}/>
            <div className="navBar_iconContainer">
                <i 
                    className={`fa-solid fa-plus fa-lg navBar_plusIcon ${isRotating ? 'navBar_rotate' : ''}`} 
                    onClick={handleOnClick}
                ></i>
            </div>
        </div>
    )
}