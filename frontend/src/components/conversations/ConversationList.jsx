import { FaSearch } from "react-icons/fa";
import "./ConversationList.css";

const ConversationList = ({
  conversations,
  selectedChat,
  onSelect,
  search,
  setSearch,
}) => {
  return (
    <div className="conversation-list">

      <div className="conversation-header">
        <h2>Conversations</h2>
      </div>

      <div className="conversation-search">
        <FaSearch />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="conversation-users">

        {conversations.length === 0 ? (
          <div className="empty-chat">
            No Conversations
          </div>
        ) : (
          conversations.map((chat) => (
            <div
              key={chat.id}
              className={`conversation-item ${
                selectedChat?.id === chat.id ? "active" : ""
              }`}
              onClick={() => onSelect(chat)}
            >

              <div className="conversation-avatar">
                {chat.name.charAt(0)}
              </div>

              <div className="conversation-info">

                <div className="conversation-top">

                  <h4>{chat.name}</h4>

                  <span>{chat.time}</span>

                </div>

                <p>{chat.company}</p>

                <small>{chat.lastMessage}</small>

              </div>

              {chat.unread > 0 && (
                <span className="unread-badge">
                  {chat.unread}
                </span>
              )}

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default ConversationList;