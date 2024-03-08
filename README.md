<h1 align='center'>🍚 Repit 🍚</h1>

<h2 align='center' style='color:gray'>Backend for Repit</h2>


<p align='center'>
  <img src="https://img.shields.io/badge/-express.js-%23404d59?style=for-the-badge&logo=Express&logoColor=%2361DAFB" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=TypeScript&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-NPM-CB3837?style=for-the-badge&logo=NPM&logoColor=fff" />&nbsp;&nbsp;
</p>
<p align='center'>
  <img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=000" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-vitest-C21325?style=for-the-badge&logo=vitest&logoColor=fff" />&nbsp;&nbsp;
</p>
<p align='center'>
  <img src="https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Prisma-22314a?style=for-the-badge&logo=Prisma&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/webpack-2B3A42.svg?style=for-the-badge&logo=webpack&logoColor=8dd6f9" />&nbsp;&nbsp;
</p>

<h2>Table of Contents</h2>

- [🛠️ Setup](#️-setup)
  - [⬇️ Installation](#️-installation)
    - [🐳 Docker](#-docker)
    - [📦 Project Setup](#-project-setup)
    - [🔒 Env](#-env)
- [🚀 Development](#-development)
  - [Running locally](#running-locally)
    - [💻 On Machine](#-on-machine)
    - [🐳 Using Docker](#-using-docker)
  - [Prisma](#prisma)
  - [Writing Code](#writing-code)
    - [Error Handling](#error-handling)
    - [📂 Directory Structure (Example for auth module)](#-directory-structure-example-for-auth-module)
    - [\</\> Code Examples](#-code-examples)
- [🚀 Production](#-production)
- [🧪 Testing](#-testing)
  - [Running Tests](#running-tests)
  - [Writing Tests](#writing-tests)

## 🛠️ Setup
### ⬇️ Installation

#### 🐳 Docker
Install [Docker](https://docs.docker.com/desktop/install/linux-install/) (optional)

#### 📦 Project Setup
Install Dependencies
```javascript
npm install
```
#### 🔒 Env
Create a `.env` file in project root. Follow the `.env.example` file to make sure you include all the environment variables

## 🚀 Development

### Running locally
The backend server can be run either locally on your machine or
through a Docker container.

#### 💻 On Machine
Start the server in watch mode
```javascript
npm run start:dev
```
#### 🐳 Using Docker
1. Start up Docker Desktop (Open the app)
2. run `docker compose up -d` to create the container
3. run `docker logs -f server` 
   - This will tail the logs so you can view the application logs in the docker container on your terminal
4. run `docker compose down` to remove the container
   - Run this command when you want to shutdown the server

### Prisma
Pulling schema changes from database
```javascript
npx prisma db pull
```
Updating the schema
```javascript
npx prisma db push
```

Generating the Prisma Client (Needed for using the ORM in code)
- Make sure you stop the server before running it
- Should be used whenever the schema changes
```javascript
npx prisma generate
```

Opening Studio to view data in database
```typescript
npx prisma studio
```

### Writing Code
<p>
Each module should be housed in their own directory (ie. auth, user, etc)
</p>

Controller classes should be added in the array when initializing the app in `index.ts`
```typescript
const app = new App([AppController, HealthController, AuthController]);
app.listen();
```


#### Error Handling

Errors are handled by 2 different middlewares:
Both of these are defined in `/src/middlewares`
- Unknown Route Middleware (Forwards a <span style='color:red'>NotFoundException</span> when going to unknown route)
- Error Handling Middleware (Catches all errors thrown and returns formatted json error object)

Http Errors in `src/utils/errors.ts` can be thrown. These will be caught by the exception middleware and will be returned as formatted json objects.

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Invalid email"
}
```

Additional Http Errors can be added by creating a new one following the structure of the example below.

Error Example
```typescript
class BadRequestException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, message);
  }
}
```

#### 📂 Directory Structure (Example for <span style='color:green'>auth</span> module)
```javascript
│
├──📂 dtos              // Req and Res objects
│  └── login.dto.ts      
│  
├──📂 tests             // Tests for controllers and services
│  └── auth.controller.spec.ts     
│  
├── auth.controller.ts  // Mapping routes
├── auth.service.ts     // For the logic
│  
```

#### </> Code Examples
`login.dto.ts`
```typescript
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

`auth.controller.ts`
```typescript
@ServiceController('/auth')
export class AuthController {
  // use constructor injection
  constructor(private readonly auth: AuthService) {}
  
  @Post('login')
  login(@Body() dto: LoginDto) {
    return auth.login(dto);
  }
}

```

`auth.service.ts`
```typescript
@Service()
export class AuthService {

  constructor(private readonly prisma: PrismaService) {}

  public login(dto: LoginDto) {
    // check if user exist in db
    // compare password against hash in db
    // gen jwt
    // return jwt
    return
  }
}

```

## 🚀 Production

Start server in production mode
```javascript
npm run start:prod
```

## 🧪 Testing

### Running Tests
```javascript
npm run test            // Unit + Integration Test
npm run test:e2e        // End to End Tests
npm run test:coverage   // Coverage
npm run ui:test         // View and run tests in browser
```

### Writing Tests
🚧 In progress 🚧
