import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import "../styles/signUp.css"
import { auth, db } from "../firebaseConfig"
import { Link, Navigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom"

function SignUpPage() {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match")
        return
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        )
        const user = userCredential.user

        const docRef = await addDoc(collection(db, "People"), {
            uid: user.uid,
            name: formData.name,
            email: formData.email,
            createdAt: new Date()
        })

        console.log("User saved with ID:", docRef.id)
        alert("Account Created Successfully ✅")
        navigate("/signin")

        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }



    return (
        <div className="signup-container">

            <h1 className="text-2xl">Create Account</h1>

            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Cena"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group password-group">
                    <label>Password</label>
                    <div className="password-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="•••••••••••"
                            onChange={handleChange}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                </div>

                <div className="input-group password-group">
                    <label>Confirm Password</label>
                    <div className="password-box">
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="•••••••••••"
                            onChange={handleChange}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showConfirm ? faEye : faEyeSlash}
                            onClick={() => setShowConfirm(!showConfirm)}
                        />
                    </div>
                </div>

                <button type="submit" className="signup-btn">
                    SIGN UP
                </button>
                    
                <p style={{
                    textAlign: "center",
                    marginTop: "18px",
                    fontSize: "14px"
                }}>
                    Already have an account?{" "}
                    <Link to="/signin" style={{ color: "#6a5cff" }} className="hover:underline">
                        Sign In
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default SignUpPage