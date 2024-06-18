FROM node:18-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat g++ make python3

WORKDIR /squid

RUN npm add -g turbo@^2
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN npx turbo prune @joystream/argo-indexer --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat g++ make python3
WORKDIR /squid

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /squid/out/json/ .
COPY --from=builder /squid/out/package-lock.json ./package-lock.json
RUN npm ci

# Build the project
COPY --from=builder /squid/out/full/ .
RUN npx turbo run build --filter=@joystream/argo-indexer...

FROM base AS runner
WORKDIR /squid

COPY --from=installer /squid/packages/indexer/package.json .
COPY --from=installer /squid/packages/core/ ./packages/core/
COPY --from=installer /squid/package-lock.json .
COPY --from=installer /squid/node_modules node_modules
COPY --from=installer /squid/packages/indexer/lib lib
# remove if no db folder
COPY --from=installer /squid/packages/indexer/db db
# remove if no schema.graphql is in the root
COPY --from=installer /squid/packages/indexer/schema.graphql .
COPY --from=installer /squid/packages/indexer/commands.json .
RUN echo -e "loglevel=silent\\nupdate-notifier=false" > /squid/.npmrc
RUN npm i -g @subsquid/commands && mv $(which squid-commands) /usr/local/bin/sqd
ENV PROCESSOR_PROMETHEUS_PORT 3000
