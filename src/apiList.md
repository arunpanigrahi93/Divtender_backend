

# authRouter
- POST/signup
- POST/login
- Post/logout

# profileRouter
- GET/profile/view
- PATCH/profile/edit
- PATCH/profie/password

# connectRequestRouter

<!-- - POST/request/send/interested/:userId
- POST/request/send/ignored/:userId -->
POST/request/send/:status/:userId
<!-- status = interested or ignored -->


<!-- - POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId -->
POST/request/review/:status/:requestId
<!-- status = accepted or rejected -->

# userRouter
- GET/user/requests/received
- GET/user/connections
