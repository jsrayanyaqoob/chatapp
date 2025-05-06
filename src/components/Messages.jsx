const Message = () => {
    return(
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: '10px 20px',
                fontFamily: "sans-serif"
            }}>
                <div className="other" style={{
                    margin: "10px 0px"
                }}>
                    <span style={{
                        backgroundColor: "#F3F3F4",
                        color: "black",
                        padding: '10px 20px',
                        borderRadius: "10px"
                    }}>
                        Hi
                    </span>
                    <p style={{
                        marginTop: '15px',
                        marginLeft: '10px',
                        fontSize: '12px',
                        color: '#5D6B71'
                    }}>10:35</p>
                </div>

                <div className="me" style={{
                    marginTop: '40px',
                    paddingTop: '40px'
                }}>
                    <span style={{
                        background: "#5892E7",
                        color: "white",
                        padding: '10px 20px',
                        borderRadius: "10px",
                    }}>
                        Hello
                    </span>
                    <p style={{
                        marginTop: '15px',
                        marginLeft: '25px',
                        fontSize: '12px',
                        color: '#5D6B71'
                    }}>10:36</p>
                </div>
            </div>
        </>
    )
}

export default Message