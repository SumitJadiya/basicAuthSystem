# basicAuthSystem
Repo which handles basic auth (Register, Login and Restricted routes) using express and mongoose

#### Middleware:
some check/functionality injected in between.

#### Next()
The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

#### Encryption
bcryptjs library used for encryption purpose

#### Token [https://jwt.io/introduction]
- most private thing for a developer.
- Expire the token after some amount of time
- Token part -> Header, Payload, Signature
- Library used - jsonwebtoken