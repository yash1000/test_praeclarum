# Todo Application

This repository contains a simple Todo application built with NestJS. It includes features such as creating, updating, and deleting Todo items.

## Getting Started

Follow these steps to set up and run the application locally:

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine. You can download it [here](https://nodejs.org/).
- PostgreSQL: Install PostgreSQL and create a database named "Test_praeclarum".

### Installation

1. Clone this repository to your local machine:

```bash
git clone git@github.com:yash1000/test_praeclarum.git
```

2. Navigate to the project directory:

```bash
cd todo-application
```

3. Install dependencies:

```bash
npm install
```

### Running the Application

- Ensure that your PostgreSQL server is running and accessible.

1. Start the application in development mode:

```bash
npm run start:dev
```

The application will be running at `http://localhost:3000`.

### Running Tests

To run the included tests, use the following command:

```bash
npm test
```

### Swagger Documentation

Visit `http://localhost:3000/api` for the Swagger documentation. Explore the available API endpoints, request/response formats, and validation details.

### Docker

If you prefer running the application using Docker:

1. Build the Docker image:

```bash
docker build -t todo-api .
```

2. Run the Docker container:

```bash
docker run -p 3000:3000 --network host todo-api
```

Make sure to expose port 5432 for PostgreSQL to allow the Docker container to access the database. Update the `database.config.json` file with your local PostgreSQL host IP.

### Note

If you wish to extend the functionality of this Todo application by adding user authentication features(WITH JWT) such as signup and login, let me know. I will follow this steps

1. **Implement User Authentication:**
   - Create new routes for user signup and login.
   - Implement user authentication logic using NestJS's authentication and authorization modules.

2. **Update Swagger Documentation:**
   - Update the Swagger documentation (`http://localhost:3000/api`) to include the new endpoints related to user management.

3. **API Endpoints:**
   - Add new API endpoints for user signup and login. For example:
     - `POST /auth/signup` for user registration.
     - `POST /auth/login` for user login.

4. **Testing:**
   - Include unit tests for the new authentication endpoints to ensure robustness and security.