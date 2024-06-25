# 📚 BookAPI

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=redhat)](https://mongoosejs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com/)

## Overview

**BookAPI** is a RESTful API designed to manage a book publication company's data. The API provides endpoints for CRUD operations on books, authors, and publications.

## Features

- Manage Books: Create, Read, Update, Delete.
- Manage Authors: Create, Read, Update, Delete.
- Manage Publications: Create, Read, Update, Delete.
- Organized using microservices architecture for scalability and maintainability.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/rishab1wnl/bookapi.git
    ```
2. Navigate to the project directory:
    ```bash
    cd bookapi
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up your environment variables. Create a `.env` file and add your MongoDB connection string:
    ```plaintext
    MONGO_URL=mongodb://localhost:27017/bookapi
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```
2. The API will be running on `http://localhost:3000`.

## API Endpoints

### Books

- **Get all books**: `GET /book`
- **Get a book by ISBN**: `GET /book/:isbn`
- **Add a new book**: `POST /book`
- **Update a book**: `PUT /book/:isbn`
- **Delete a book**: `DELETE /book/:isbn`

### Authors

- **Get all authors**: `GET /author`
- **Get an author by ID**: `GET /author/:id`
- **Add a new author**: `POST /author`
- **Update an author**: `PUT /author/:id`
- **Delete an author**: `DELETE /author/:id`

### Publications

- **Get all publications**: `GET /publication`
- **Get a publication by ID**: `GET /publication/:id`
- **Add a new publication**: `POST /publication`
- **Update a publication**: `PUT /publication/:id`
- **Delete a publication**: `DELETE /publication/:id`

## Project Structure

```plaintext
bookapi/
├── API/
│   ├── Book.js
│   ├── Author.js
│   └── Publication.js
├── node_modules/
├── .env
├── index.js
├── package.json
└── README.md
```


- `API/Book.js`: Handles book-related endpoints.
- `API/Author.js`: Handles author-related endpoints.
- `API/Publication.js`: Handles publication-related endpoints.
- `index.js`: Main entry point for the server.


