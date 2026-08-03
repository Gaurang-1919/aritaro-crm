import { useState } from "react";

const dummyChats = [
  {
    id: 1,
    name: "John Doe",
    company: "Google",
    lastMessage: "Let's schedule the meeting.",
    status: "Online",
  },
  {
    id: 2,
    name: "Sarah Smith",
    company: "Meta",
    lastMessage: "Can you send the proposal?",
    status: "Offline",
  },
  {
    id: 3,
    name: "David Wilson",
    company: "Amazon",
    lastMessage: "Waiting for your reply.",
    status: "Online",
  },
];

const Conversations = () => {
  const [selected, setSelected] = useState(dummyChats[0]);

  return (
    <div style={{ display: "flex", height: "80vh", background: "#fff" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "320px",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <h2 style={{ padding: "20px" }}>Conversations</h2>

        {dummyChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelected(chat)}
            style={{
              padding: "15px 20px",
              cursor: "pointer",
              background:
                selected.id === chat.id ? "#f3f4f6" : "white",
              borderBottom: "1px solid #eee",
            }}
          >
            <h4>{chat.name}</h4>
            <small>{chat.company}</small>

            <p
              style={{
                marginTop: "5px",
                color: "#666",
              }}
            >
              {chat.lastMessage}
            </p>
          </div>
        ))}
      </div>

      {/* Chat */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <h2>{selected.name}</h2>
          <p>{selected.company}</p>
        </div>

        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              background: "#f3f4f6",
              padding: "12px",
              borderRadius: "10px",
              width: "fit-content",
              marginBottom: "15px",
            }}
          >
            Hi, thanks for contacting us.
          </div>

          <div
            style={{
              background: "#2563eb",
              color: "white",
              padding: "12px",
              borderRadius: "10px",
              width: "fit-content",
              marginLeft: "auto",
            }}
          >
            {selected.lastMessage}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            padding: "15px",
            borderTop: "1px solid #ddd",
          }}
        >
          <input
            placeholder="Type message..."
            style={{
              flex: 1,
              padding: "12px",
            }}
          />

          <button
            style={{
              marginLeft: "10px",
              padding: "12px 20px",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conversations;