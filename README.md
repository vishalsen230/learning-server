# learning-server

## Prerequisite

1. Docker - Install docker from its official website.
2. Git - Install git if not already present in your OS.
3. Node - Above v14.17.0

## Steps

1. Clone learning-server
```bash
git clone git@github.com:vishalsen230/learning-server.git
```
2. Run `npm i` once.
3. Set the `DATABASE_URL` in your .env file.
4. Run docker image of postgresql using `docker-compose up -d`
5. Run the initial migration of prisma schema using `npx prisma migrate dev --name "init"`
6. Run `npx prisma studio` to run prisma studio on localhost:5555.
7. Run `npm run dev` from the root directory to run the apollo server.