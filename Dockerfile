# Dockerfile for flessner_web

# Build stage
FROM rust:1.93-slim AS builder

# Install build dependencies (including Node.js for Tailwind CSS compilation)
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package.json and install npm dependencies first (for better caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files
COPY Cargo.toml build.rs ./
COPY src ./src
COPY templates ./templates

# Build for release (build.rs will run Tailwind CSS build)
RUN cargo build --release

# Runtime stage
FROM debian:bookworm-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/target/release/flessner_web /app/flessner_web
COPY --from=builder /app/templates /app/templates
COPY --from=builder /app/static /app/static

# Expose port 3000

# Run the binary
CMD ["/app/flessner_web"]
