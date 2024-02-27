ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-alpine as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN pnpm i -g turbo
COPY . .
RUN turbo prune @blog/site --docker

FROM base as installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN pnpm i

COPY --from=builder /app/out/full/ .
RUN pnpm build --filter=@blog/site

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/site/next.config.js .
COPY --from=installer /app/apps/site/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/site/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/site/.next/static ./apps/site/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/site/public ./apps/site/public

EXPOSE 3000
CMD node apps/site/server.js

