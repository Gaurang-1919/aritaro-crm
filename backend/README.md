Thunder Client test in order.

1. Register a user

POST http://localhost:3000/api/auth/register
Body (JSON):
{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "test123",
  "role": "admin"
}

2. Login (if already registered)

POST http://localhost:3000/api/auth/login
Body (JSON):

{ "email": "admin@test.com", "password": "test123" }

3. Get current user

GET http://localhost:3000/api/auth/me

4.Create a lead

POST http://localhost:3000/api/leads
Body (JSON):

{
  "leadName": "John Doe",
  "phone": "9999999999",
  "email": "john@acme.com",
  "source": "instagram"
}


6. Get all leads

GET http://localhost:3000/api/leads

7. Get one lead

GET http://localhost:3000/api/leads/<leadId>

8. Update a lead

PATCH http://localhost:3000/api/leads/<leadId>

json
{ "status": "proposal" }

9. Create a conversation

POST http://localhost:3000/api/conversations

json
{
  "leadId": "<leadId>",
  "userId": "<your user id from /me>",
  "notes": "Called and discussed pricing",
  "outcome": "interested"
}
10. Create a meeting

POST http://localhost:3000/api/meetings

json
{
  "leadId": "<leadId>",
  "meetingDate": "2026-08-01T10:00:00.000Z",
  "status": "scheduled"
}


11. Create a follow-up

POST http://localhost:3000/api/followups

json
{
  "leadId": "<leadId>",
  "userId": "<your user id>",
  "followUpDate": "2026-08-05T10:00:00.000Z",
  "notes": "Check if they decided"
}
