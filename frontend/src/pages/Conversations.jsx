import { useEffect, useState } from "react";

import {
  getConversations,
  createConversation,
} from "../api/conversationApi";

const Conversations = () => {

  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {

    try {
      const res = await getConversations();

      const data = res.data.data || [];
      setConversations(data);
      if (data.length) {
        setSelected(data[0]);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {

    if (!message.trim() || !selected) return;

    try {
      await createConversation({
        leadId: selected.leadId?._id,
        userId: selected.userId?._id,
        message,
      });
      setMessage("");
      fetchConversations();

    } catch (err) {
      console.error(err);
      alert("Unable to send message");
    }
  };

  return (

    <div
      style={{
        display: "flex",
        height: "80vh",
        background: "#fff",
      }}
    >

      <div
        style={{
          width: "320px",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
      >

        <h2 style={{ padding: "20px" }}>
          Conversations
        </h2>

        {conversations.map((chat) => (

          <div
            key={chat._id}
            onClick={() => setSelected(chat)}
            style={{
              padding: "15px 20px",
              cursor: "pointer",
              background:
                selected?._id === chat._id
                  ? "#f3f4f6"
                  : "white",
              borderBottom: "1px solid #eee",
            }}
          >

            <h4>
              {chat.leadId?.leadName || "-"}
            </h4>

            <small>
              {chat.userId?.name || "-"}
            </small>

            <p
              style={{
                marginTop: "5px",
                color: "#666",
              }}
            >
              {chat.message}
            </p>
          </div>
        ))}
      </div>

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

          <h2>
            {selected?.leadId?.leadName || "-"}
          </h2>

          <p>
            {selected?.userId?.name || "-"}
          </p>
        </div>

        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
          }}
        >
          {selected ? (

            <div
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "12px",
                borderRadius: "10px",
                width: "fit-content",
              }}
            >
              {selected.message}
            </div>
          ) : (
            <p>No Conversation Selected</p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            padding: "15px",
            borderTop: "1px solid #ddd",
          }}
        >

          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Type message..."
            style={{
              flex: 1,
              padding: "12px",
            }}
          />

          <button
            onClick={handleSend}
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