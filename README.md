<h1 align='center'>🍚 Backend 🍚</h1>

<h2 align='center' style='color:gray'>Backend for Repit</h2>


<p align='center'>
  <img src="https://img.shields.io/badge/-Express-fff?style=for-the-badge&logo=Express&logoColor=000" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=TypeScript&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-NPM-CB3837?style=for-the-badge&logo=NPM&logoColor=fff" />&nbsp;&nbsp;
</p>
<p align='center'>
  <img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Nodemon-76D04B?style=for-the-badge&logo=Nodemon&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=000" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Jest-C21325?style=for-the-badge&logo=Jest&logoColor=fff" />&nbsp;&nbsp;
</p>
<p align='center'>
  <img src="https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Prisma-22314a?style=for-the-badge&logo=Prisma&logoColor=fff" />&nbsp;&nbsp;
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

## 🛠️ Setup
### ⬇️ Installation

#### 🐳 Docker
Install [Docker](https://docs.docker.com/desktop/install/linux-install/)

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
Generating the Prisma Client (Needed for using the ORM in code)
- Make sure you stop the server before running it
```javascript
npx prisma generate
```

### Writing Code
<p>
Each module should be housed in their own directory (ie. auth, user, etc)
</p>

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
│  └── auth.dto.ts      
│  
├──📂 tests             // Tests for controllers and services
│  └── auth.spec.ts     
│  
├── auth.controller.ts  // Functions to map to each route
├── auth.route.ts       // Define the routes
├── auth.service.ts     // For the logic
│  
```

#### </> Code Examples
`app.route.ts`
```typescript
// Make sure to implement the interface 'Route'
export class AppRoute implements Route {
  // Path prefix for all routes of this router
  public readonly path = "";
  public readonly router = Router();
  // Don't exlude from global prefix '/api'
  public readonly excludePrefix = false;
  private readonly app = new AppController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes(): void {
    this.router.get("/testing", this.app.testing);
  }
}
```

`app.controller.ts`
```typescript
export class AppController {
  // Use Container.get(<ServiceName>) to inject service
  private readonly app = Container.get(AppService);
  
  // Define functions for the routes

  // Make sure to use the handle function for provided error handling
  public testing = handle((req: Request, res: Response) => {
    res.send(this.app.testing())
  });
}

```

`app.service.ts`
```typescript
// Make sure to annoate with the '@Service' decorator
@Service()
export class AppService {
  public testing() {
    return "testing";
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
```
