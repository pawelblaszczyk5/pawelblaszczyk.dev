ARG NODE_VERSION=20.12.2
FROM node:${NODE_VERSION}-alpine as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV REDIS_DATABASE_AVAILABLE="true"

RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN pnpm i -g turbo
COPY . .
RUN turbo prune @pawelblaszczyk.dev/website --docker

FROM base as installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN pnpm i --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN --mount=type=secret,id=TURBO_TEAM --mount=type=secret,id=TURBO_TOKEN --mount=type=secret,id=SQLITE_PROXY_URL --mount=type=secret,id=REDIS_DATABASE_URL TURBO_TEAM="$(cat /run/secrets/TURBO_TEAM)" TURBO_TOKEN="$(cat /run/secrets/TURBO_TOKEN)" SQLITE_PROXY_URL="$(cat /run/secrets/SQLITE_PROXY_URL)" REDIS_DATABASE_URL="$(cat /run/secrets/REDIS_DATABASE_URL)" pnpm build --filter=@pawelblaszczyk.dev/website

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/website/next.config.js .
COPY --from=installer /app/apps/website/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/website/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/.next/static ./apps/website/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/public ./apps/website/public

EXPOSE 3000
CMD node apps/website/server.js
