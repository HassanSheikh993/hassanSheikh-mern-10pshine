import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/navBar.css"

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
    
    return(
        <div className="navBar_container">
            <p className="navBar_title" onClick={handleNavigateHome}>ThinkInk</p>
            <div className="navBar_iconContainer">
                <i 
                    className={`fa-solid fa-plus fa-lg navBar_plusIcon ${isRotating ? 'navBar_rotate' : ''}`} 
                    onClick={handleOnClick}
                ></i>
            </div>
        </div>
    )
}