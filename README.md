
# Social Network App

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Questions](#questions)
- [Contributions](#contributions)
- [Authors](#authors)
- [License](#license)

## Description
The Social Network API is a NoSQL-based backend application designed to support a social networking platform. This API allows users to create accounts, share thoughts, react to other users' thoughts, and manage a friend list. Built using Node.js, Express.js, MongoDB, and Mongoose, the API follows a RESTful architecture and efficiently handles large amounts of unstructured data.

## Installation
npm install express mongoose dotenv cors

## Usage

### 📂 Installation & Setup

#### Clone the Repository

- git clone git@github.com:Ajthompson88/social-network-app.git
- cd backend

#### 💽 Install Dependancies

| Package         | Description                   |
|-----------------|-------------------------------|
| express         | Web framework for API routing |
| mongoose        | MongoDB ODM (Object Data Modeling) |
| dotenv          | Loads environment variables from a `.env` file |
| cors            | Middleware for handling Cross-Origin Resource Sharing |

- npm install express mongoose dotenv cors

#### 💽 Install DevDependancies 

| Package | 	Description            |
|---------|----------------------------|
| typescript	| Enables TypeScript support |
|ts-node-dev	| Runs TypeScript code in development mode with auto-restart|
| @types/express	| Type definitions for Express.js |
| @types/mongoose	|Type definitions for Mongoose |
|jest	|JavaScript testing framework|
|supertest	|Library for testing API endpoints|
|@types/jest	|Type definitions for Jest|
|@types/supertest	|Type definitions for Supertest |
|mongodb-memory-server	|In-memory MongoDB instance for testing |

npm install --save-dev typescript ts-node-dev @types/express @types/mongoose jest supertest @types/jest @types/supertest mongodb-memory-server


#### Set Envinronment Variables

- MONGO_URI=mongodb://127.0.0.1:27017/socialDB
- PORT=3000

#### Start the Server

- npm run dev
- npm start

#### Explanation of Scripts 

| Script | Command | Description|
|--------|---------|------------|
| Start Server| npm start| Runs the compiled JavaScript version `(dist/server.js)`|
| Development Mode | npm run dev | Runs TypeScript `(src/server.ts)` with auto-reloading|
| Build Project | npm run build | Compiles files into JavaScript `(dist/)` folder|

## 📡 API Routes

#### 🧑 User Routes
| Method  | Endpoint                           | Description                          |
|---------|------------------------------------|--------------------------------------|
| `GET`   | `/api/users`                      | Get all users                        |
| `GET`   | `/api/users/:userId`              | Get a single user by ID              |
| `POST`  | `/api/users`                      | Create a new user                    |
| `PUT`   | `/api/users/:userId`              | Update a user by ID                  |
| `DELETE`| `/api/users/:userId`              | Delete a user by ID                  |
| `POST`  | `/api/users/:userId/friends/:friendId` | Add a friend |
| `DELETE`| `/api/users/:userId/friends/:friendId` | Remove a friend |

---

#### 💭 Thought Routes
| Method  | Endpoint                          | Description                         |
|---------|-----------------------------------|-------------------------------------|
| `GET`   | `/api/thoughts`                   | Get all thoughts                   |
| `GET`   | `/api/thoughts/:thoughtId`        | Get a single thought by ID         |
| `POST`  | `/api/thoughts`                   | Create a new thought               |
| `PUT`   | `/api/thoughts/:thoughtId`        | Update a thought by ID             |
| `DELETE`| `/api/thoughts/:thoughtId`        | Delete a thought by ID             |

---

#### 💬 Reaction Routes
| Method  | Endpoint                                  | Description                          |
|---------|------------------------------------------|--------------------------------------|
| `POST`  | `/api/thoughts/:thoughtId/reactions`    | Add a reaction to a thought         |
| `DELETE`| `/api/thoughts/:thoughtId/reactions/:reactionId` | Remove a reaction from a thought |



## 🧪 Running Tests

| Script | Command | Description |
|--------|---------|-------------|
| Run Tests | npm test | Executes Jest tests |
| Watch Tests | npm run test:watch | Runs Jest in watch mode for live testing |
| Test Coverage | npm run test:coverage | Shows Jest test coverage report |


## Questions
For any questions, please contact me at:
- GitHub: https://github.com/Ajthompson88/
- Email: aj.thompson8888@gmail.com

## 📩 Contributions

If you have any issues, suggestions, or contributions, feel free to open an issue or submit a pull request!

## Authors

- Andrew Thompson 
- AI assistance provided by ChatGPT
- AI assistance provided by Github Copilot

## 📜 License
MIT

## 🎯 Summary

- Fully functional backend API for a social network.
- CRUD operations for Users, Thoughts, and Reactions.
- MongoDB database with Mongoose models.
- Comprehensive API testing using Jest & Supertest.
- RESTful architecture built with Express.js.
