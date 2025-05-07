import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoginError(""); 

    try {
      const response = await fetch("https://localhost:7033/api/UsersApi/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: data.Email,  
          Password: data.Password,
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const user = await response.json();
      localStorage.setItem("userId", user.id);
      navigate("/Home");
    } catch (error) {
      setLoginError(error.message); 
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="container gap-5">
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("Email", { required: "Este campo es obligatorio" })}
          />
          {errors.Email && <span className="text-danger">{errors.Email.message}</span>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            {...register("Password", { required: "Este campo es obligatorio" })}
          />
          {errors.Password && <span className="text-danger">{errors.Password.message}</span>}
          {loginError && <span className="text-danger">{loginError}</span>} 
        </div>

        <div className="d-flex justify-content-center">
          <button className="mt-5 mx-auto botonLogin" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

