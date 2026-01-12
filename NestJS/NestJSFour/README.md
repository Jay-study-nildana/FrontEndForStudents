# NestJS Four

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
1. Admin Panel
    1. List all Users
    1. List all Roles
    1. Add Role to User (useful to give regular user admin role)
    1. Get specific User details
1. File Uploads
    1. Upload files
    1. View files
    1. Files are linked to the user who uploaded the files. 

# .env file

a .env.example has been provided. fill up the neccessary details. 

# how to run (prepare database)

```
npx prisma generate
npx prisma migrate deploy 
npm run prisma:seed 
npx prisma studio (check if tables and seed data is added as expected)
```

1. note: To apply existing migrations from the migrations folder: npx prisma migrate deploy 
1. note: To generate a fresh migration (delete the exisiting migration folder first) from the current schema and apply it (dev workflow): npx prisma migrate dev --name init
1. note : if you get errors, try 'npm install' and 'npm install @prisma/client'

# how to run (project)

```
npm install
npm run start
```

# swagger

1. Swagger UI: http://localhost:3000/docs
1. Swagger JSON: http://localhost:3000/docs-json

# TODO

1. fix linting errors
1. fix errors (jest))
1. fix errors (e2e)
1. check and improve coverage (after fixing jest and e2e errors)

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
