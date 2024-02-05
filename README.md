<h1>🍚 Backend 🍚</h1>

<h2>Table of Contents</h2>

- [🛠️ Setup](#️-setup)
  - [⬇️ Installation](#️-installation)
    - [🐳 Docker](#-docker)
    - [📦 Project Setup](#-project-setup)
    - [🔒 Env](#-env)
- [🚀 Development](#-development)
  - [🐳 Using Docker for Development](#-using-docker-for-development)
  - [Writing Code](#writing-code)
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

Start the server in watch mode
```javascript
npm run start:dev
```
### 🐳 Using Docker for Development
1. Start up Docker Desktop (Open the app)
2. run `docker compose up -d` to create the container
3. run `docker logs -f server` to read the logs
4. run `docker compose down` to remove the container

### Writing Code
Each module should be housed in their own directory (ie. auth, user, etc)
<br>

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