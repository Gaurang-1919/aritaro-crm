import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "./ChatWindow.css";

const ChatWindow = ({ selectedChat }) => {
  const [message, setMessage] = useState("");

  if (!selectedChat) {
    return (
      <div className="chat-empty">
        <h2>Select a conversation</h2>
        <p>Choose a contact to start chatting.</p>
      </div>
    );
  }

  const handleSend = () => {
    if (!message.trim()) return;

    alert("Backend integration pending.");
    setMessage("");
  };

  return (
    <div className="chat-window">

      <div className="chat-header">

        <div className="chat-user">

          <div className="chat-avatar">
            {selectedChat.name.charAt(0)}
          </div>

          <div>
            <h3>{selectedChat.name}</h3>
            <p>{selectedChat.company}</p>
          </div>

        </div>

      </div>

      <div className="chat-body">

        {selectedChat.messages.map((msg) => (

          <div
            key={msg.id}
            className={`message ${
              msg.sender === "me"
                ? "my-message"
                : "client-message"
            }`}
          >

            <div className="message-text">
              {msg.text}
            </div>

            <span className="message-time">
              {msg.time}
            </span>

          </div>

        ))}

      </div>

      <div className="chat-footer">

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button onClick={handleSend}>
          <FaPaperPlane />
        </button>

      </div>

    </div>
  );
};

export default ChatWindow;