# Use Node 20 as the base image
FROM node:20-slim AS base

# Install build dependencies
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the application
# We pass VITE_API_URL as a build arg so the frontend knows where the API is
# We set NITRO_PRESET=node-server to ensure a Node-compatible build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
ENV NITRO_PRESET=node-server

RUN npm run build

# Final production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only the necessary files from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server/runner.js ./server/runner.js

# Expose the standard port for TanStack Start
EXPOSE 3000

# Start the server using our standalone runner
CMD ["node", "server/runner.js"]
