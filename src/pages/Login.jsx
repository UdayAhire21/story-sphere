import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../axiosConfig";
import "./Login.css"; // Make sure this import is here!

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Replace this with your actual API/axios login logic
    const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await api.post(

            "/auth/login",

            {

                email,

                password

            }

        );

        const data = response.data;

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(

            "user",

            JSON.stringify({

                username: data.username,

                email: data.email,

                role: data.role

            })

        );

        alert("Login Successful");

        navigate("/");

    }

    catch(error){

        console.log(error);

        alert("Login Failed");

    }

};

    return (
        <div className="login-page-wrapper">
            <Navbar />
            
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">
                            Login to continue reading amazing stories
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="login-submit-btn">
                            Login
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Don't have an account?</p>
                        <Link to="/register" className="register-link-text">
                            Register and start publishing your own stories.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;