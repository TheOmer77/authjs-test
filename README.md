# Authjs thing

This is a [Next.js](https://nextjs.org/) and [Auth.js]() test app created by following [this](https://youtu.be/1MTyCvS05V4?si=UUJNH97y03OBzp5z). It's probably bad though 🙃

This project uses [Docker](https://www.docker.com/) to run the Next.js app itself, as well as a local Postgres DB and Prisma Studio.

## Getting Started

First, copy the contents of `.env.example` into a new `.env` file, and fill in any empty variables.

If not filling in the DB values, the local Postgres DB run with Docker will be used by default. If you want to use a different database, feel free to change these values. **All other variables are required.**

Now run both the local DB and the Next app with Docker Compose:

```bash
docker compose up -d
```

Initialize the database by running:

```bash
docker compose exec app pnpm db:push
```

Open [localhost:3000](http://localhost:3000) in your browser to see the app.
You can also view the database in Prisma Studio at [localhost:5555](https://localhost:5555/).

Yes, I just copied most of this README from [this repo](https://github.com/TheOmer77/lucia-drizzle-test) that uses Lucia auth lol \
I will probably use that repo as a base for future projects, not this one.
