import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from "@fortawesome/free-solid-svg-icons"
import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import { useState } from "react"



export default function MainPage() {

    const [selectedUser, setSelectedUser] = useState(null)

    return (
        <>
             <div className="flex h-screen">

            
            <Sidebar setSelectedUser={setSelectedUser} />

          
            <div className="flex-1">
                {selectedUser ? (
                    <ChatWindow selectedUser={selectedUser} />
                ) : (
                    <div className="flex items-center justify-center h-full text-white">
                        Select a user to start chatting
                    </div>
                )}
            </div>

        </div>
        </>
    )
}