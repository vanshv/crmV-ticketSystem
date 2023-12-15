## API Resources

### User API Resources

All the user API router follows `/v1/user/`

| #   | Routers                   | Verbs  |  Description                               |
| --- | ------------------------- | ------ | -------------------------------------------|
| 1   | `/v1/user`                | GET    |  Get user Info                             |
| 2   | `/v1/user`                | POST   |  Create a User                             |
| 3   | `/v1/user/login`          | POST   |  User Authentication, return JWT           |
| 4   | `/v1/user/reset-password` | POST   |  Verify email and pin to reset the password|
| 5   | `/v1/user/reset-password` | PATCH  |  Set new password                          |
| 6   | `/v1/user/logout`         | DELETE |  Delete user accessJWT                     |

### Ticket API Resources

All the user API router follows `/v1/ticket/`

| #   | Routers                        | Verbs |                              |
| --- | ------------------------------ | ----- | --------------------------------------- |
| 1   | `/v1/ticket`                   | GET   | Get all ticket for the logined in user  |
| 2   | `/v1/ticket/{id}`              | GET   | Get a ticket details                    |
| 3   | `/v1/ticket`                   | POST  | Create a new ticket                     |
| 4   | `/v1/ticket/{id}`              | PUT   | Update ticket details ie. reply message |
| 5   | `/v1/ticket/close-ticket/{id}` | PATCH | Update ticket status to close           |
| 6   | `/v1/ticket/{id}`              | DELET | Delete a ticket                         |

### Tokens API Resources

All the user API router follows `/v1/tokens`

| #   | Routers      | Verbs |  Description            |
| --- | ------------ | ----- |  ---------------------- |
| 1   | `/v1/tokens` | GET   |  Get a fresh access JWT |