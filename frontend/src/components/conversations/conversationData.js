const conversationData = [
  {
    id: 1,
    name: "John Doe",
    company: "Google",
    lastMessage: "Can we schedule a meeting tomorrow?",
    time: "10:30 AM",
    unread: 2,
    messages: [
      {
        id: 1,
        sender: "client",
        text: "Hi, I wanted to discuss the CRM.",
        time: "10:15 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Sure, let's schedule a meeting.",
        time: "10:20 AM",
      },
      {
        id: 3,
        sender: "client",
        text: "Can we schedule a meeting tomorrow?",
        time: "10:30 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Rahul Sharma",
    company: "Infosys",
    lastMessage: "Thank you!",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "client",
        text: "Project looks great.",
        time: "5:00 PM",
      },
      {
        id: 2,
        sender: "me",
        text: "Thank you!",
        time: "5:05 PM",
      },
    ],
  },
];

export default conversationData;