## how to use project

1. `npm i`
2. instead of your own MongoDB URL and JWT Secret in '.env' file
3. `npm run start`

## Environment setup

- `npm i bcryptjs body-parser cookie-parser csurf dotenv ejs express jsonwebtoken mongoose nodemon validator`

| Lib |explanation |
|---|---|
|nodemon|helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected |
|bcryptjs|protect against rainbow table attacks, bcrypt is an adaptive function|
|csurf| Cross-Site Request Forgery (CSRF) Prevention|
|dotenv|Loads environment variables from .env file|
|validator|String validation and sanitization|
