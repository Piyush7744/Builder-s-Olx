import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [isVerifier, setIsVerifier] = useState('no'); // "yes" or "no"
    const [verifierPassword, setVerifierPassword] = useState(''); // For popup password
    const [showPopup, setShowPopup] = useState(false);

    const handleApi = () => {

        const url = API_URL + '/signup';
        const data = {
            username,
            password,
            mobile,
            email,
            isVerifier: isVerifier === "yes" ? "yes" : "no" // Adding verifier identity
        };

        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                }
            })
            .catch(() => {
                alert('Server error. Please try again later.');
            });
    };

    useEffect(() => {
        if (isVerifier === "yes") {
            setShowPopup(true);
        } else {
            setShowPopup(false);
        }
    }, [isVerifier]);

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
            height: "600px",
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
        radioGroup: {
            display: "flex",
            gap: "15px",
            marginBottom: "15px",
        },
        radioLabel: {
            display: "flex",
            alignItems: "center",
            gap: "5px",
        },
        popup: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            zIndex: 1000,
        },
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
        },
    };

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.leftSide}></div>
                    <div style={styles.rightSide}>
                        <h2 style={styles.title}>Create Your Account</h2>
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
                            <label htmlFor="email" style={styles.label}>
                                Email
                            </label>
                            <input
                                id="email"
                                style={styles.input}
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="mobile" style={styles.label}>
                                Mobile
                            </label>
                            <input
                                id="mobile"
                                style={styles.input}
                                type="text"
                                placeholder="Enter your mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
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

                            <label style={styles.label}>Are you a Verifier?</label>
                            <div style={styles.radioGroup}>
                                <label style={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="yes"
                                        checked={isVerifier === "yes"}
                                        onChange={() => setIsVerifier("yes")}
                                    />
                                    Yes
                                </label>
                                <label style={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="no"
                                        checked={isVerifier === "no"}
                                        onChange={() => setIsVerifier("no")}
                                    />
                                    No
                                </label>
                            </div>

                            {showPopup && (
                                <div style={styles.overlay}>
                                    <div style={styles.popup}>
                                        <h3>Enter Verifier Password</h3>
                                        <input
                                            type="password"
                                            style={styles.input}
                                            placeholder="Enter Verifier Password"
                                            value={verifierPassword}
                                            onChange={(e) => setVerifierPassword(e.target.value)}
                                        />
                                        <button
                                            style={styles.button}
                                            onClick={() => {
                                                if (verifierPassword === "1234") {
                                                    alert("Verifier password accepted. Proceed with signup.");
                                                    setShowPopup(false); // Close the popup
                                                    setVerifierPassword(""); // Reset password input
                                                } else {
                                                    alert("Password is incorrect.");
                                                    setShowPopup(false);
                                                    setVerifierPassword(""); // Reset password input
                                                }
                                            }}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button
                                style={styles.button}
                                onClick={handleApi}
                            >
                                Sign Up
                            </button>
                        </form>
                        <p style={styles.link}>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                style={styles.anchor}
                            >
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
