
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

### Clone the Repository

- git clone git@github.com:Ajthompson88/social-network-app.git
- cd backend

### Install Depenancies

- npm install

### Set Envinronment Variables

- MONGO_URI=mongodb://127.0.0.1:27017/socialDB
- PORT=3000

### Start the Server

- npm run dev
- npm start

## 📡 API Routes

### 🧑 User Routes
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

### 💭 Thought Routes
| Method  | Endpoint                          | Description                         |
|---------|-----------------------------------|-------------------------------------|
| `GET`   | `/api/thoughts`                   | Get all thoughts                   |
| `GET`   | `/api/thoughts/:thoughtId`        | Get a single thought by ID         |
| `POST`  | `/api/thoughts`                   | Create a new thought               |
| `PUT`   | `/api/thoughts/:thoughtId`        | Update a thought by ID             |
| `DELETE`| `/api/thoughts/:thoughtId`        | Delete a thought by ID             |

---

### 💬 Reaction Routes
| Method  | Endpoint                                  | Description                          |
|---------|------------------------------------------|--------------------------------------|
| `POST`  | `/api/thoughts/:thoughtId/reactions`    | Add a reaction to a thought         |
| `DELETE`| `/api/thoughts/:thoughtId/reactions/:reactionId` | Remove a reaction from a thought |



## 🧪 Running Tests

- npm test


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
