# nodejs-ecs
Web server written in NodeJS and TypeScript and deployed to AWS ECS and ECR

### Project structure
```
project
│   README.md -> contains all the basic info which you should read before you start
│   .gitignore -> if you want to ignore files and not push to git, add them here
│   environment.d.ts -> add any env variable here, typescript will thank you later
│   package.json -> all the dependency and build instructions
│   package-lock.json -> dependency version locks   
│   tsconfig.json -> typescript configuration file
│   tslint.json -> linters are here, so be careful 🤓
│   Dockerfile -> docker configuration file for docker build
│   .dockerignore -> files to ignore with docker
│
└───dist/ -> all your compiled project goes here
│   └───src/ -> compiled source code
│       │   index.js -> entry point of server app
│       │   ...
│       │   ...
│   
└───src
│   └───handler/ -> all your controller and handler should go here
│   └───router/ -> router setup for this project
│   └───server/ -> server setup for this project
│   │
│   │  index.ts -> entry point of server app written in TypeScript
```

### Getting started
- Clone the repository
- Install NodeJS, NPM and Docker
- Run `npm i` inside the repo folder
- Run `npm run start` to build and run the project locally

### Build
- run `npm run build` for local build
- run `npm run build:docker` for local docker build

### Run locally
- run `npm run start` for local run
- run `npm run start:docker` for local docker run
