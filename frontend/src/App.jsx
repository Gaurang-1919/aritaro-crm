import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import LeadLog from "./pages/LeadLog";
import AddLead from "./pages/AddLead";
import LeadDetails from "./pages/LeadDetails";
import Kanban from "./pages/Kanban";
import Conversations from "./pages/Conversations";
import Meetings from "./pages/Meetings";
import FollowUps from "./pages/FollowUps";
import Analytics from "./pages/Analytics";
import Revenue from "./pages/Revenue";
import Projection from "./pages/Projection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leads" element={<LeadLog />} />
        <Route path="add-lead" element={<AddLead />} />
        <Route path="lead/:id" element={<LeadDetails />} />
        <Route path="kanban" element={<Kanban />} />
        <Route path="conversations" element={<Conversations />} />
        <Route path="meetings" element={<Meetings />} />
        <Route path="followups" element={<FollowUps />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="projection" element={<Projection />} />
      </Route>
    </Routes>
  );
}

export default App;