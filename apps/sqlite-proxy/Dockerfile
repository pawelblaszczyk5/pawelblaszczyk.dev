ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-alpine as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN apk add --no-cache libc6-compat ca-certificates fuse3 sqlite

FROM base AS builder
RUN apk update

WORKDIR /app

RUN pnpm i -g turbo
COPY . .
RUN turbo prune @pawelblaszczyk.dev/sqlite-proxy --docker

FROM base as installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN pnpm i --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN --mount=type=secret,id=TURBO_TEAM --mount=type=secret,id=TURBO_TOKEN TURBO_TEAM="$(cat /run/secrets/TURBO_TEAM)" TURBO_TOKEN="$(cat /run/secrets/TURBO_TOKEN)" pnpm build --filter=@pawelblaszczyk.dev/sqlite-proxy

FROM base AS runner

ENV LITEFS_DIR="/litefs/data"
ENV DATABASE_FILENAME="sqlite.db"
ENV DATABASE_URL="$LITEFS_DIR/$DATABASE_FILENAME"
ENV INTERNAL_PORT="3000"
ENV PORT="3001"

WORKDIR /app

COPY --from=installer /app/apps/sqlite-proxy/package.json .

COPY --from=installer /app/apps/sqlite-proxy/node_modules/better-sqlite3/build .
COPY --from=installer /app/apps/sqlite-proxy/dist ./dist
COPY --from=installer /app/apps/sqlite-proxy/drizzle ./drizzle
COPY --from=flyio/litefs:0.5 /usr/local/bin/litefs /usr/local/bin/litefs
COPY --from=installer /app/apps/sqlite-proxy/litefs.yml /etc

RUN mkdir -p /data ${LITEFS_DIR}

ENTRYPOINT litefs mount
