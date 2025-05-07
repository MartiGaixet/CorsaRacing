import React from "react";
import Form from "../components/LoginForm"
import Logo from "../assets/CRLogo.png"
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const goSignup = () => {
        navigate("/signup");
      }


    return (
    <div className="d-flex">
        <div className="bodyLogin">
            <img src={Logo} width="100" height="auto" alt="Logo" className="mt-5 ms-5"></img>
            <h4 className="othersSubtitles mt-5">WELCOME TO</h4>
            <h1 className="mt-4 titleLogin">CORSA RACING</h1>
            <h6 className="mt-5 descLogin">An all in one platform for racing enthusiasts
            from beginners to pros. Become a legend in
            motorsport with our competitive system! </h6>
        </div>
        <div className="formContainer">
        <h4 className="mt-5">Corsa Racing</h4>
        <h4 className="mt-5 text-align-left">Welcome back!</h4>
        <p className="mt-2">Don't have an account? Create a new account now <span onClick={goSignup}><b>here</b></span></p>
        <div className="mt-5 d-flex justify-content-center">
        <Form></Form>
        </div>
        
        </div>
    </div>

    );
}

export default Login