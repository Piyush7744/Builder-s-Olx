import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleApi = () => {
        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/');
                    }
                }
            })
            .catch(() => {
                alert('Server error. Please try again later.');
            });
    };

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f4f4f9",
        },
        card: {
            display: "flex",
            width: "60%",
            maxWidth: "900px",
            height: "500px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "20px",
            overflow: "hidden",
            backgroundColor: "#fff",
        },
        leftSide: {
            flex: "1",
            backgroundImage: `url('/assets/login.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        },
        rightSide: {
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
            color: "#002f34",
        },
        title: {
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "20px",
        },
        form: {
            width: "80%",
            maxWidth: "400px",
        },
        label: {
            fontSize: "14px",
            marginBottom: "5px",
            display: "block",
        },
        input: {
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            marginBottom: "15px",
            fontSize: "14px",
        },
        button: {
            width: "100%",
            padding: "10px 20px",
            backgroundColor: "rgba(0, 47, 52, 0.95)",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
        },
        link: {
            marginTop: "15px",
            fontSize: "14px",
            textAlign: "center",
        },
        anchor: {
            color: "rgba(0, 47, 52, 0.95)",
            fontWeight: "bold",
            textDecoration: "none",
        },
    };

    return (
        <div>
            <Header />
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Left side with image */}
                <div style={styles.leftSide}></div>
                {/* Right side with form */}
                <div style={styles.rightSide}>
                    <h2 style={styles.title}>Welcome Back</h2>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        style={styles.form}
                    >
                        <label htmlFor="username" style={styles.label}>
                            Username
                        </label>
                        <input
                            id="username"
                            style={styles.input}
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="password" style={styles.label}>
                            Password
                        </label>
                        <input
                            id="password"
                            style={styles.input}
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            style={styles.button}
                            onClick={handleApi}
                        >
                            Log In
                        </button>
                    </form>
                    <p style={styles.link}>
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            style={styles.anchor}
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Login;
