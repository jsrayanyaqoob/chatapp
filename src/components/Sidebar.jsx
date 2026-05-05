import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faSearch, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { collection, onSnapshot } from "firebase/firestore"
import { db, auth } from "../firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { signOut } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"

export default function Sidebar({ setSelectedUser }) {


    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [newName, setNewName] = useState("")


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "People"), (snapshot) => {
            const userList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setUsers(userList)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // match Firestore user using uid or email
                const foundUser = users.find(u => u.email === user.email)


                if (foundUser) {
                    setCurrentUser(foundUser)

                }
            }
        })


        return () => unsubscribe()
    }, [users])




    const handleSignOut = async () => {
        await signOut(auth)
        window.location.href = "/signin"
    }

    const handleUpdateName = async () => {
        if (!currentUser) return

        const userRef = doc(db, "People", currentUser.id)

        await updateDoc(userRef, {
            name: newName
        })

        setIsEditing(false)
    }


    return (
        <div className="bg-[#161717] w-[300px] h-screen border-r border-[#2E2F2F] flex flex-col p-3" style={{ padding: "0.55rem" }}>

            {/* Header */}
            <div className="flex items-center justify-between " style={{
                margin: "0px 0px 10px",
                padding: "0px 4px 0px"
            }}>
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faComment} className="text-white text-xl" />
                    <span className="text-white font-semibold text-lg">Chattrix</span>
                </div>
                <FontAwesomeIcon icon={faEllipsisVertical} className="text-white cursor-pointer" />
            </div>

            {/*input Search */}
            <div className="relative mb-4 px-1">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-[#1F2020] text-white px-4 py-2 rounded-lg outline-none text-sm"
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="text-gray-400 absolute right-3 top-4 text-sm"
                />
            </div>

            {/* Users List */}
            <div
                style={{
                    marginTop: "15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    overflowY: "auto",
                    flex: 1,
                    paddingRight: "5px"
                }}
            >
                {users
                    .filter(user => user.uid !== auth.currentUser?.uid)
                    .map((user) => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px",
                                borderRadius: "12px",
                                backgroundColor: "#1C1D1D",
                                cursor: "pointer",
                                transition: "0.2s",
                                border: "1px solid #2A2B2B"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#262727"
                                e.currentTarget.style.transform = "scale(1.01)"
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "#1C1D1D"
                                e.currentTarget.style.transform = "scale(1)"
                            }}
                        >
                            {/* Avatars */}
                            <div
                                style={{
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "50%",
                                    backgroundColor: "#6a5cff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}
                            >
                                {user.name?.charAt(0).toUpperCase()}
                            </div>

                            {/* Info */}
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ color: "white", fontSize: "15px", fontWeight: 600 }}>
                                    {user.name}
                                </span>
                                <span style={{ color: "#9CA3AF", fontSize: "12px" }}>
                                    Tap to chat
                                </span>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Current User */}
            <div style={{
                padding: "12px",
                borderTop: "1px solid #2E2F2F",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>

                {/* USER INFO */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    <div className="w-10 h-10 bg-[#6a5cff] rounded-full flex items-center justify-center text-white font-semibold">
                        {currentUser?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <p style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>
                            {currentUser?.name}
                        </p>
                        <p style={{ color: "#9CA3AF", fontSize: "12px" }}>
                            Active
                        </p>
                    </div>
                </div>

                {/* EDIT NAME INPUT */}
                {isEditing && (
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="New name..."
                        style={{
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #333",
                            backgroundColor: "#1F2020",
                            color: "white",
                            outline: "none"
                        }}
                    />
                )}

                {/* BTNS */}
                <div style={{
                    display: "flex",
                    gap: "8px"
                }}>

                    {/* UPDATE BTn */}
                    {!isEditing ? (
                        <button
                            onClick={() => {
                                setNewName(currentUser?.name || "")
                                setIsEditing(true)
                            }}
                            style={{
                                flex: 1,
                                padding: "8px",
                                backgroundColor: "#6a5cff",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            onClick={handleUpdateName}
                            style={{
                                flex: 1,
                                padding: "8px",
                                backgroundColor: "#22c55e",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Save
                        </button>
                    )}

                    {/* SIGN OUT BTN */}
                    <button
                        onClick={handleSignOut}
                        style={{
                            flex: 1,
                            padding: "8px",
                            backgroundColor: "#ef4444",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        Sign Out
                    </button>

                </div>

            </div>

        </div>
    )
}