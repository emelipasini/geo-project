# Geo Project

A TypeScript-based GraphQL server integrated with Apollo, utilizing a JSON server API for handling geographical data for learning purposes.

Technologies: TypeScript, GraphQL, Node, Apollo, JSON server, Jest.
Tools: VSCode, Git, GitHub Copilot, ChatGPT.

## Instalation and configuration

Node.js is required to run this project, I'm using version 18.16.0. So far the config files don't have sensitive info so it's not necessary to configure anything.

```bash
npm install
npm run build
```

## Running the project

Keep in mind that the project has 2 servers that must run at the same time because the GraphQL one gets the data from the API generated with json-server.

```bash
npm run json-server
npm run start
```

## Running the tests

Note that the tests need to run the Test API before they can be executed.

```bash
npm run test-server
npm test
```
