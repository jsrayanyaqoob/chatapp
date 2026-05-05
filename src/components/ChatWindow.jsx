import { useEffect, useState } from "react"
import { db, auth } from "../firebaseConfig"
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "firebase/firestore"

export default function ChatWindow({ selectedUser }) {

    const [messages, setMessages] = useState([])
    const [text, setText] = useState("")

    if (!selectedUser) return null

    const chatId = [auth.currentUser.uid, selectedUser.uid]
        .sort()
        .join("_")

   
    const formatTime = (timestamp) => {
        if (!timestamp) return ""

    
        const date =
            timestamp?.toDate
                ? timestamp.toDate()
                : new Date(timestamp)

        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    // raltime messages
    useEffect(() => {
        const q = query(
            collection(db, "Chats", chatId, "messages"),
            orderBy("timestamp", "asc")
        )

        const unsub = onSnapshot(q, (snap) => {
            setMessages(
                snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            )
        })

        return () => unsub()
    }, [chatId])

    // message sendingh
    const sendMessage = async () => {
        if (!text.trim()) return

        await addDoc(collection(db, "Chats", chatId, "messages"), {
            text,
            senderId: auth.currentUser.uid,
            timestamp: serverTimestamp()   // 🔥 this creates timestamp
        })

        setText("")
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            backgroundColor: "#0f0f0f"
        }}>

            {/* HEADER  hai ye bhai */}
            <div style={{
                padding: "14px",
                borderBottom: "1px solid #2E2F2F",
                color: "white",
                fontWeight: "600",
                fontSize: "16px"
            }}>
                {selectedUser.name}
            </div>

            {/* MESSAGES */}
            <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>

                {messages.map(msg => (
                    <div
                        key={msg.id}
                        style={{
                            alignSelf:
                                msg.senderId === auth.currentUser.uid
                                    ? "flex-end"
                                    : "flex-start",

                            backgroundColor:
                                msg.senderId === auth.currentUser.uid
                                    ? "#6a5cff"
                                    : "#2a2b2b",

                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "12px",
                            maxWidth: "60%",
                            fontSize: "14px",
                            wordBreak: "break-word"
                        }}
                    >
                        {/* message   */}
                        <div>{msg.text}</div>

                        
                        <div style={{
                            fontSize: "10px",
                            marginTop: "4px",
                            opacity: 0.7,
                            textAlign: "right"
                        }}>
                            {formatTime(msg.timestamp)}
                        </div>
                    </div>
                ))}

            </div>

            {/* INPUT */}
            <div style={{
                display: "flex",
                gap: "10px",
                padding: "12px",
                borderTop: "1px solid #2E2F2F"
            }}>

                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "10px",
                        border: "none",
                        outline: "none",
                        backgroundColor: "#1F2020",
                        color: "white"
                    }}
                />

                <button
                    onClick={sendMessage}
                    style={{
                        backgroundColor: "#6a5cff",
                        color: "white",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "10px",
                        cursor: "pointer"
                    }}
                >
                    Send
                </button>

            </div>

        </div>
    )
}   