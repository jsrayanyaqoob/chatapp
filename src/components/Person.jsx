import './person.css';

function Person({name, message, image}) {
    return (
        <>
            <div className='personSection'>
                <img src={image ? image : "https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp"} alt="" width="40px" height="40px" style={{
                    borderRadius: "50%",
                }} />
                <span className='personInfo' style={{
                    marginLeft: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px'
                }}>
                    <h3>{name ? name : "Rayan"}</h3>
                    <p>{message ? message : "..."}</p>
                </span>
            </div>
        </>
    )
}

export default Person