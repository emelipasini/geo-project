# Geo Project

A TypeScript-based GraphQL server integrated with Apollo, utilizing a JSON server API for handling geographical data for learning purposes.

Technologies: TypeScript, GraphQL, Node, Apollo, JSON server.
Tools: VSCode, Git, GitHub Copilot, ChatGPT.

## Instalation and configuration

Node.js is required to run this project, I'm using version 18.16.0. So far the .env file only has a localhost url so it's not necessary to configure anything.

```bash
cp _.env .env

npm install
npm run build
```

## Running the project

Keep in mind that the project has 2 servers that must run at the same time because the GraphQL one gets the data from the API generated with json-server.

```bash
npm run json-server
npm run start
```
