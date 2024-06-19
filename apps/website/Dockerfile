ARG NODE_VERSION=22.3.0
FROM node:${NODE_VERSION}-slim as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN apt-get update && apt-get install -y ca-certificates

FROM base AS builder

WORKDIR /app

RUN pnpm i -g turbo@2.0.4
COPY . .
RUN turbo prune @pawelblaszczyk.dev/website --docker

FROM base as installer

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN pnpm i --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN --mount=type=secret,id=TURBO_TEAM --mount=type=secret,id=TURBO_TOKEN --mount=type=secret,id=TURSO_AUTH_TOKEN --mount=type=secret,id=TURSO_SYNC_URL --mount=type=secret,id=TURSO_URL TURBO_TEAM="$(cat /run/secrets/TURBO_TEAM)" TURBO_TOKEN="$(cat /run/secrets/TURBO_TOKEN)" TURSO_AUTH_TOKEN="$(cat /run/secrets/TURSO_AUTH_TOKEN)" TURSO_SYNC_URL="$(cat /run/secrets/TURSO_SYNC_URL)" TURSO_URL="$(cat /run/secrets/TURSO_URL)" pnpm build --filter="@pawelblaszczyk.dev/website"

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
