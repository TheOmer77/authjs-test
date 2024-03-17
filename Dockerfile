FROM node:20.10.0-alpine3.19

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY prisma prisma
RUN corepack enable pnpm && pnpm install

CMD ["pnpm", "dev"]