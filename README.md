# Cashnotik; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/Admin-149/cashnotik/blob/master/LICENSE)

App help to manage users expenses and incomes on different accounts.

It can be used from browser and mobile as PWA app.

## Developing

### Built With
React, GraphQL, Apollo, NestJS

### Prerequisites
To start dev environment is needed to install

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)


### Setting up Dev

To start developing the project do further:

```shell
git clone https://github.com/Admin-149/cashnotik.git
cd cashnotik/
cd client && npm install
cd ../server && npm install
cd ..
```

This commands will install all dependencies

Then create .env file and fill it according .env.example

To start project do further:

```
npm run db:start
npm run server:start
npm run client:start
```

To start auto-generate graphql types do further:

```
npm run client:typings
npm run server:typings
```

### Building

In progress...

### Deploying / Publishing

In progress...

## Versioning

In progress...


## Configuration

In progress...

## Tests

In progress...

## Style guide

In progress...


## Database

In progress...

## Licensing

[MIT](https://github.com/Admin-149/cashnotik/blob/master/LICENSE)
