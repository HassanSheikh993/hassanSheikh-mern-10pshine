import { useEffect, useState } from "react";
import { userLoginApi } from "../../services/authService";
import "../../styles/login.css"
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleOnChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setIsTyping(true);
    
    setLoginMessage("");
  }

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1100); 
      return () => clearTimeout(timer);
    }
  }, [isTyping, userData]);

  function handlePasswordToggle() {
    setShowPassword(!showPassword);
  }

  function handleNavigateToRegister(){
    navigate("/register")
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setIsTyping(false); 
    
    try {
      const result = await userLoginApi(userData.email, userData.password);
      setLoginMessage(result.message);
      navigate("/")
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 404)
      ) {
        setLoginMessage(error.response.data.message);
      } else {
        setLoginMessage("SomeThing Went Wrong Try Again");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="login_parent">
        <div className="login_container">

          <div className="auth_side_part">
            <h1>NOTE APP</h1>
            <img src="/images/auth2.jpg" alt="" />
          </div>

          <form action="" onSubmit={handleFormSubmit} className="login_form">
            <label htmlFor="" className="login_label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleOnChange}
              placeholder="Enter Email"
              required
              className="login_input"
            />

            <label htmlFor="" className="login_label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              onChange={handleOnChange}
              placeholder="Enter password"
              required
              className="login_input"
            />
            <button
              type="button"
              onClick={handlePasswordToggle}
              className="login_toggleBtn"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            <input type="submit" className="login_submit" />

            <p className="login_goToRegister" onClick={handleNavigateToRegister}>Create A New Account</p>

            {isTyping && !isSubmitting && !loginMessage && (
              <div className="login_gif_container">
                <img src="/images/try2.gif" alt="Typing..." className="login_gif" />
              </div>
            )}

            {loginMessage && !isTyping && (
              <div className="login_gif_container">
                <img src="/images/try1.gif" alt="Message status" className="login_gif" />
                <p className="login_message">{loginMessage}</p>
              </div>
            )}

            {isSubmitting && (
              <div className="login_gif_container">
                <p>Submitting...</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};