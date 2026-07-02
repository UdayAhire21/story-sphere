import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

       try {

    const response = await axios.post(
        "http://localhost:8080/auth/register",
        user
    );

    console.log(response.data);

    alert(
        "User Registered Successfully"
    );

    navigate("/login");

} catch (error) {

    console.log(error);

    alert(
        "Registration Failed"
    );
}
    };

    return (

        <div>

            <Navbar />

            <div
                style={{
                    maxWidth: "400px",
                    margin: "50px auto",
                    padding: "25px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    boxShadow: "0px 2px 10px rgba(0,0,0,0.2)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center"
                    }}
                >
                    Register
                </h1>

                <form onSubmit={handleSubmit}>

                    <label>Username</label>

                    <br />

                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px"
                        }}
                    />

                    <label>Email</label>

                    <br />

                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px"
                        }}
                    />

                    <label>Password</label>

                    <br />

                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "20px"
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            cursor: "pointer"
                        }}
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Register;