# Step 1 - Install dependencies
FROM node:22.8.0-alpine3.20 AS deps
LABEL author="Rovshen Atayev <at.rovshan@gmail.com>"

ENV HTTP_PROXY=http://10.0.2.2:10811
ENV HTTPS_PROXY=http://10.0.2.2:10811
ENV COREPACK_ENABLE_STRICT=false

WORKDIR /app

# Pin pnpm version to match your lockfile
RUN corepack enable && corepack prepare pnpm@8.10.1 --activate

COPY package.json pnpm-lock.yaml ./

# Use pnpm cache mount for faster builds
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod --ignore-scripts

USER node

# Step 2 - Build the source code
FROM node:22.8.0-alpine3.20 AS build
LABEL author="Rovshen Atayev <at.rovshan@gmail.com>"

ENV HTTP_PROXY=http://10.0.2.2:10811
ENV HTTPS_PROXY=http://10.0.2.2:10811
ENV COREPACK_ENABLE_STRICT=false

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@8.10.1 --activate

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm prisma generate
RUN pnpm build

USER node

# Step 3 - Production image
FROM node:22.8.0-alpine3.20 AS runner
LABEL author="Rovshen Atayev <at.rovshan@gmail.com>"

ENV HTTP_PROXY=http://10.0.2.2:10811
ENV HTTPS_PROXY=http://10.0.2.2:10811
ENV APP_PORT=3000

WORKDIR /app
USER node

COPY --chmod=555 --from=deps /app/node_modules ./node_modules
# Копируем папку с Prisma Client
COPY --chmod=555 --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --chmod=555 --from=build /app/node_modules/.pnpm/@prisma+client@6.2.1_prisma@6.2.1 ./node_modules/.pnpm/@prisma+client@6.2.1_prisma@6.2.1
COPY --chmod=555 --from=build /app/dist ./dist
COPY --chmod=555 --from=build /app/prisma ./prisma
COPY --chmod=555 entrypoint.sh /app/entrypoint.sh

EXPOSE ${APP_PORT}

ENTRYPOINT ["/app/entrypoint.sh"]
