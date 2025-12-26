# NestJS Three

This project shows

1. Hello World NestJS project
2. CRUD with a in-memory database
3. Swagger documentation
4. Usage of NestJS features such as Controllers, DTOs, entities, modules, repository pattern and services
1. CRUD with Prisma ORM with PostGre
1. Authentication and Authorization
    1. Using Passport
    1. Uses Prisma ORM with PostGre
    1. Register, Login, Refresh Token, About User (based on Token)
    1. Swagger updated to include Token Box
    1. Database seeding to add default user with admin role. 
    1. Role Capabilities
    1. Demo API endpoints that show role based restrictions like public, authentication only and role based restriction. 

# .env file

a .env.example has been provided. fill up the neccessary details. 

# prisma - postgre database

npm install prisma --save-dev
npm install @prisma/client
npx prisma init (if prisma folder is deleted or you want to start fresh)
npx prisma migrate dev --name init
npx prisma generate 
npx prisma db seed (for seeding database)
npx prisma migrate deploy (Apply the existing migrations to your (empty) DB)
npx prisma migrate reset (Reset the DB and reapply all migrations (dev, wipes data)
npx prisma db push (Push current schema to DB without using migrations (fast, no migration history))

# how to run

npm install
npm run start:dev
npm run start

# swagger

Swagger UI: http://localhost:3000/docs
Swagger JSON: http://localhost:3000/docs-json

# book a session with me

1. [calendly](https://calendly.com/jaycodingtutor/30min)

# hire and get to know me

find ways to hire me, follow me and stay in touch with me.

1. [github](https://github.com/Jay-study-nildana)
1. [personal site](https://thechalakas.com)
1. [upwork](https://www.upwork.com/fl/vijayasimhabr)
1. [fiverr](https://www.fiverr.com/jay_codeguy)
1. [codementor](https://www.codementor.io/@vijayasimhabr)
1. [stackoverflow](https://stackoverflow.com/users/5338888/jay)
1. [Jay's Coding Channel on YouTube](https://www.youtube.com/channel/UCJJVulg4J7POMdX0veuacXw/)
1. [medium blog](https://medium.com/@vijayasimhabr)