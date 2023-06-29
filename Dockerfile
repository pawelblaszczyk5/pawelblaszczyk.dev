# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.3.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential ca-certificates fuse3

# SvelteKit app lives here
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV FLY="true"
ENV LITEFS_DIR="/litefs/data"
ENV DATABASE_FILENAME="sqlite.db"
ENV DATABASE_PATH="$LITEFS_DIR/$DATABASE_FILENAME"
ENV INTERNAL_PORT="3000"
ENV PORT="3001"

# Install PNPM
RUN corepack enable

# Throw-away build stage to reduce size of final image
FROM base as build

# Install node modules
COPY --link package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY --link . .

# Build application
RUN pnpm build

# Remove development dependencies
RUN echo -e "\nignore-scripts=true" >> .npmrc
RUN pnpm prune --prod

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Litefs setup
COPY --from=flyio/litefs:0.4 /usr/local/bin/litefs /usr/local/bin/litefs
ADD other/litefs.yml /etc/litefs.yml
RUN mkdir -p /data ${LITEFS_DIR}

CMD ["litefs", "mount"]