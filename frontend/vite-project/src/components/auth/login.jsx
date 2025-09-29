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

  function handleOnChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  function handlePasswordToggle() {
    setShowPassword(!showPassword);
  }

  function handleNavigateToRegister(){
    navigate("/register")
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
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
    }
  }

  return (
    <>
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
      </form>

      <p className="login_goToRegister" onClick={handleNavigateToRegister}>Create A New Account</p>

      {loginMessage && <p className="login_message">{loginMessage}</p>}
    </>
  );
};
