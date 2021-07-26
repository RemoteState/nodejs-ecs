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
│   jest.config.js -> jest test runner configuration
│   .prettierrc -> pretify your code
│   docker-compose.yml -> pull and run all dependency such as DB locally
│   clean.sh -> delete the build folder (dist)
│   ormconfig.ts -> database/typeorm config file
│
└───dist/ -> all your compiled project goes here
│   └───src/ -> compiled source code
│       │   index.js -> entry point of server app
│       │   ...
│       │   ...
│   
└───src/ -> all your source code
│   └───controller/ -> all your controller and handler should go here
│   └───router/ -> router setup for this project
│   └───server/ -> server setup for this project
│   └───database/ -> all database files like entities, migrations etc
│   └───utils/ -> common utility class
│   └───types/ -> all your types for request/response interface, non db models and Joi validators
│   │
│   │   index.ts -> entry point of server app written in TypeScript
│   
└───deployment/ -> all your deployment and stack creation template and settings
│   │   ecs-stack.json -> cloudformation template to create ECS stack
│   │   parameter-store.sh -> add required params/secrets to AWS paramter store
│   │   rds-event.template -> SMS notification subscription for database events like fail over etc.
│   │   rds.template -> AWS teplate to create master and one read replicate for postgres DB
```

### Getting started
- Clone the repository
- Install NodeJS, NPM and Docker
- Run `npm i` inside the repo folder
- Run `npm run start` to build and run the project locally

### Prerequisite
Before you build or run the server locally, you should start docker and run
```bash
docker-compose up -d or docker compose up -d
```
To pull down the docker containers
```bash
docker-compose down or docker compose down
```

### Migration
- to create a new migration run `typeorm migration:create -n {migration-name}`
- to run migration `typeorm migration:run`

### Environment
To run this project locally you need to set following env vars
- PORT
- DB_PORT
- DB_HOST
- DB_USER
- DB_PASS
- DB_NAME

### Build
- run `npm run build` for local build
- run `npm run build:docker` for local docker build

### Run locally
- run `npm run start` for local run
- run `npm run start:docker` for local docker run


### Testing
- run `npm run test` to run all the tests
- all the test files should go inside `__test__` folder
- all test files should have `test` in name, ending with `.ts` for example `hello.test.ts`

### Deployment
Before you deploy this project, you need to configure your AWS CLI and AWS account
- create ECR repository, and push your docker image and then get the repo URL
- upload `deployment/ecs-stack.json` to Cloudformation dashboard > create on AWS
- provide the config details and ECR url and finish the stack creation
- run `sh ./deployment/parameter_store_values.sh` with all the required values filled
- run ```aws cloudformation create-stack \
  --template-body file://deployment/rds.template \
  --stack-name YourStackName``` with required values filled to create RDS postgres instance
- optionally you can run ```aws cloudformation create-stack \
  --template-body file://deployment/rds.event.template \
  --stack-name YourStackName``` to enable SMS notification for DB events
  
You can also validate the template using
```bash
aws cloudformation validate-template \
  --template-body file://deployment/rds.template
```

Once your stack is created and running, you can then configure CI/CD pipeline to run the
test `npm run test` and lint `npm run lint`, then build the docker image and push to ECR. The server deployment
will be automatically updated with the latest ECR image

-- Happy coding  😉

