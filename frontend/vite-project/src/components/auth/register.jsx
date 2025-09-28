import { useEffect, useState } from "react";
import { registerUserApi } from "../../services/authService";
import "../../styles/register.css"

export const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");

  function handleOnChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  function handlePasswordToggle() {
    setShowPassword(!showPassword);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const result = await registerUserApi(userData);
      setRegisterMessage(result.message);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 404)
      ) {
        setRegisterMessage(error.response.data.message);
      } else {
        setRegisterMessage("SomeThing Went Wrong Try Again");
      }
    }
  }

  return (
    <>
      <form
        action=""
        onSubmit={handleFormSubmit}
        className="register_form"
      >
        <label htmlFor="" className="register_label">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleOnChange}
          placeholder="Enter Name"
          required
          className="register_input"
        />

        <label htmlFor="" className="register_label">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleOnChange}
          placeholder="Enter Email"
          required
          className="register_input"
        />

        <label htmlFor="" className="register_label">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={userData.password}
          onChange={handleOnChange}
          placeholder="Enter password"
          required
          className="register_input"
        />
        <button
          type="button"
          onClick={handlePasswordToggle}
          className="register_toggleBtn"
        >
          {showPassword ? "Hide" : "Show"}
        </button>

        <input type="submit" className="register_submit" />
      </form>

      {registerMessage && (
        <p className="register_message">{registerMessage}</p>
      )}
    </>
  );
};
