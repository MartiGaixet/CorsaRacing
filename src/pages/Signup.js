import React from "react";
import Form from "../components/SignUpForm"
import Logo from "../assets/CRLogo.png"
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const goLogin = () => {
        navigate("/");
      }


    return (
    <div className="d-flex">
        <div className="bodyLogin">
            <img src={Logo} width="100" height="auto" alt="Logo" className="mt-5 ms-5"></img>
            <h4 className="othersSubtitles2">WELCOME TO</h4>
            <h1 className="mt-4 titleLogin">CORSA RACING</h1>
            <h6 className="mt-5 descLogin">An all in one platform for racing enthusiasts
            from beginners to pros. Become a legend in
            motorsport with our competitive system! </h6>
        </div>
        <div className="formContainer">
        <h4 className="mt-5">Corsa Racing</h4>
        <h4 className="form-margen text-align-left">Welcome!</h4>
        <p className="mt-2">Already have an account? Login <span onClick={goLogin}><b>here</b></span></p>
        <div className="mt-5 d-flex justify-content-center">
        <Form></Form>
        </div>
        </div>
    </div>

    );
}

export default Signup