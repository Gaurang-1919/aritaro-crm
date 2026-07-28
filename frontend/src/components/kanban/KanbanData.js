const kanbanData = [
  {
    id: "new",
    title: "New",
    leads: [
      {
        id: 1,
        name: "John Doe",
        company: "Google",
        value: "$8,500",
      },
      {
        id: 2,
        name: "Rahul Sharma",
        company: "Infosys",
        value: "$4,200",
      },
    ],
  },
  {
    id: "proposal",
    title: "Proposal",
    leads: [
      {
        id: 3,
        name: "Sarah",
        company: "Microsoft",
        value: "$12,000",
      },
    ],
  },
  {
    id: "deposit",
    title: "Deposit",
    leads: [],
  },
  {
    id: "followup",
    title: "Follow Up",
    leads: [],
  },
  {
    id: "won",
    title: "Won",
    leads: [],
  },
  {
    id: "lost",
    title: "Lost",
    leads: [],
  },
];

export default kanbanData;