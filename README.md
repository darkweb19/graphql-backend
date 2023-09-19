# Twitter Backend using TypeScript, Docker, JWT Authentication, Apollo Server, and PostgreSQL

This is a backend server for a Twitter-like application built using TypeScript, Docker, JWT for user authentication, Apollo Server for GraphQL API, and PostgreSQL for the database.

## Prerequisites

Before you begin, ensure you have the following dependencies installed:

-   Node.js and npm (https://nodejs.org/)
-   Docker and Docker Compose (https://docs.docker.com/get-docker/)
-   PostgreSQL (https://www.postgresql.org/)

## Installation

1. Clone the repository:

-   git clone https://github.com/darkweb19/graphql-backend.git

2. Install dependencies:

-   npm install or yarn install

3. Set up the environment variables:

-   DATABASE_URL=postgresql://username:password@localhost:5432/twitterdb?schema=public
-   JWT_SECRET=your-secret-key

4. Run the application using Docker Compose:

-   docker-compose up -d

## Usage

The server should now be running at http://localhost:8000/graphhql. You can access the GraphQL Playground to interact with the API and perform queries and mutations.

## Project Structure

prisma/: Contains the database schema

src/: Contains the TypeScript source code.
src/graphql/user: Contains GraphQL schema and resolvers.
src/services/: Contains authentication logic and JWT handling for users.
src/lib/: Contains database connection and models.
docker-compose.yml: Docker Compose configuration for PostgreSQL.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.
