import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../styles/home.css"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom"

function HomePage() {

    const socialStyle = {
        backgroundColor: "#fff",
        borderRadius: "50%",
        padding: "6px 6px",
        fontSize: "22px"
    }

    return (
        <>

            <div style={{
                color: "#fff",
                display: "flex",
                justifyContent: "center", 
                alignItems: "center", 
                flexDirection: "column", 
                gap: '10px',
                marginTop: '20px',
                paddingTop: '20px'
            }}>
                <FontAwesomeIcon icon={faComments} style={{
                    fontSize: "6rem"
                }} />
                <h1 style={{
                    fontFamily: "sans-serif",
                    fontSize: '30px',
                    letterSpacing: '3px',
                    fontWeight: 100,
                    wordSpacing: '5px'

                }}>CHAT APP</h1>
            </div>


            <div style={{
                display: 'flex',
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                marginTop: '30px',
                paddingTop: '30px',
                gap: '20px'
            }}>
                <div>
                    <h1 style={{
                        color: "#fff",
                        fontFamily: "sans-serif",
                        fontWeight: 100
                    }}>Welcome Back</h1>
                </div>
                <div>
                    <Link to="/signin" style={{
                        padding: "11px",
                        fontSize: '14px',
                        color: "#fff",
                        backgroundColor: "transparent",
                        border: "1px solid #fff",
                        borderRadius: "30px",
                        width: "280px",
                        cursor: "pointer",
                        fontWeight: 550,
                        textDecoration: "none",
                        fontFamily: "sans-serif",
                        display: "inline-block", 
                        textAlign: "center",
                    }}>SIGN IN</Link>
                </div>
                <div>
                    <Link to="/signup" style={{
                        padding: "11px",
                        fontSize: '14px',
                        color: "#000",
                        backgroundColor: "#fff",
                        border: "1px solid #fff",
                        borderRadius: "30px",
                        width: "280px",
                        cursor: "pointer",
                        fontWeight: 550,
                        textDecoration: "none",
                        fontFamily: "sans-serif",
                        display: "inline-block", 
                        textAlign: "center",
                    }}>SIGN UP</Link>
                </div>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: "column",
                gap: '8px',
                justifyContent: "center",
                alignItems: "center",
                marginTop: '35px',
                paddingTop: "20px"
            }}>
                <div>
                    <p style={{
                        color: "#fff",
                        fontFamily: "sans-serif",
                    }}>Login with Social Media</p>
                </div>
                <div className="socialMedias" style={{
                    display: "flex",
                    gap: '7px'
                }}>
                    {/* Logos */}
                    <FontAwesomeIcon className="cursor-pointer" style={socialStyle} icon={faInstagram} />
                    <FontAwesomeIcon className="cursor-pointer" style={socialStyle} icon={faTwitter} />
                    <FontAwesomeIcon className="cursor-pointer" style={socialStyle} icon={faFacebook} />
                </div>
            </div>
        </> 
    )
}

export default HomePage

