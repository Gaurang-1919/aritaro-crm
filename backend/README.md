# Aritaro CRM

Aritaro CRM is a full-stack Customer Relationship Management (CRM) system designed to streamline the complete sales lifecycle—from lead creation to customer conversion. The platform centralizes lead management, conversations, meetings, follow-ups, sales tracking, and business analytics into a single application.

---

# Project Overview

The CRM is built to help sales teams efficiently manage leads, monitor customer interactions, track revenue, and measure team performance while minimizing duplicate data entry through automated business calculations.

---

# Objectives

- Centralize customer and lead information
- Manage the complete lead lifecycle
- Visual Kanban-based lead management
- Track conversations, meetings, and follow-ups
- Assign leads to setters and closers
- Monitor sales performance
- Calculate revenue and commissions
- Generate business projections
- Identify inactive leads and sales bottlenecks

---

# CRM Workflow

```
Lead Created
      │
      ▼
First Contact
      │
      ▼
Conversation
      │
      ▼
Meeting Booked
      │
      ▼
Meeting Held
      │
      ▼
Offer Made
      │
      ▼
Follow-Up
      │
      ▼
Won / Lost
```

---

# Features

## Authentication

- Secure Login
- JWT Authentication
- Password Encryption
- Role Based Access Control

---

## User Roles

### Admin / Manager

- Complete CRM access
- User Management
- Reports
- Dashboard
- System Configuration

### Setter

- Create Leads
- Contact Prospects
- Schedule Meetings
- Assign Leads

### Closer

- Manage Meetings
- Handle Sales
- Track Revenue
- Close Deals

---

# Core Modules

## Lead Management

- Create Lead
- Update Lead
- Delete Lead
- Search Leads
- Filter Leads
- Assign Setter & Closer
- Lead Status Tracking

---

## Kanban Board

Visual Lead Pipeline

- New
- Proposal
- Deposit
- Follow-Up Ongoing
- Meeting Follow-Up
- Won
- Lost

---

## Conversations

Track every communication with a lead.

- Notes
- Date
- Outcome
- User Activity

---

## Meetings

- Schedule Meetings
- Meeting Status
- Meeting Outcome
- Meeting History

---

## Follow-Ups

- Follow-up Schedule
- Pending Activities
- Completed Follow-ups
- Missed Follow-ups

---

## Dashboard

Business insights including:

- Total Leads
- Active Leads
- Won Leads
- Lost Leads
- Revenue
- Deposits
- Cash Collected
- Close Rate
- Offer Rate
- Average Deal Size

---

## Notifications

Receive reminders for:

- Upcoming Meetings
- Pending Follow-ups
- Deposits
- Lead Activities

---

## Activity Logs

Track every important action performed inside the CRM.

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| Authentication | JWT |
| Password Security | bcrypt |
| Version Control | Git & GitHub |

---

# Backend Modules

```
Authentication

Users

Leads

Conversations

Meetings

Follow-Ups

Activities

Notifications

Dashboard
```

---

# Database Collections

```
Users

Leads

Conversations

Meetings

FollowUps

Activities

Notifications
```

---

# Backend Folder Structure

```
backend
│
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── validators
│   ├── utils
│   ├── constants
│   └── app.js
│
├── server.js
├── package.json
└── .env
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server

```bash
npm run dev
```

---

# API Modules

- Authentication
- User Management
- Lead Management
- Kanban Management
- Conversation Management
- Meeting Management
- Follow-Up Management
- Dashboard
- Notifications

---

# Development Workflow

```
Requirements

↓

Planning

↓

Project Setup

↓

Authentication

↓

Lead Management

↓

Kanban

↓

Conversations

↓

Meetings

↓

Follow-Ups

↓

Dashboard

↓

Integration

↓

Testing

↓

Deployment
```

---

# Team

| Member | Responsibility |
|---------|---------------|
| Gaurang | Frontend, Documentation & Project Coordination |
| Krishna | Backend & Database |
| Abhishek | Project Support |

---

# MVP

The first release focuses on:

- Authentication
- User Roles
- Lead Management
- Kanban Board
- Lead Details
- Conversations
- Meetings
- Follow-Ups
- Basic Dashboard
- Search & Filters

---

# Future Scope

- Revenue Forecasting
- Advanced Analytics
- Performance KPIs
- Financial Reports
- Smart Notifications
- Automation
- Commission Tracking
- Business Insights

---

# License

This project is developed for the Aritaro CRM platform for educational and development purposes.