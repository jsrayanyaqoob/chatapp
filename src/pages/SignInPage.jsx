import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { Link } from "react-router-dom"
import MainPage from "./MainPage.jsx"
import { useNavigate } from "react-router-dom"

function SignInPage() {
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Successful");
            navigate("/main");
        })
        .catch((error) => {
            alert(error)
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #6a5cff, #8f7bff)",
            fontFamily: "sans-serif"
        }}>

            <div style={{
                width: "90%",
                maxWidth: "420px",
                background: "#fff",
                padding: "35px",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}>

                <h1 style={{
                    textAlign: "center",
                    marginBottom: "25px",
                    fontSize: "28px",
                    fontWeight: "600"
                }}>
                    Sign In
                </h1>

                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ fontSize: "14px" }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "14px",
                                marginTop: "6px",
                                borderRadius: "12px",
                                border: "1px solid #ddd",
                                fontSize: "15px",
                                outline: "none"
                            }}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: "25px" }}>
                        <label style={{ fontSize: "14px" }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "14px",
                                marginTop: "6px",
                                borderRadius: "12px",
                                border: "1px solid #ddd",
                                fontSize: "15px",
                                outline: "none"
                            }}
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "14px",
                            background: "#6a5cff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "25px",
                            fontSize: "15px",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        SIGN IN
                    </button>

                </form>

                <p style={{
                    textAlign: "center",
                    marginTop: "18px",
                    fontSize: "14px"
                }}>
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ color: "#6a5cff" }} className="hover:underline">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default SignInPage