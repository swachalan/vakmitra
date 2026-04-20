# VakMithra AI Studio: Deployment Guide (Hostinger Cloud VPS)

This document provides technical instructions for deploying the **VakMithra AI Studio** application. The application is containerized using Docker and consists of two main services: a TanStack Start (SSR) Frontend and an Express.js Backend API.

---

## 1. Prerequisites
Ensure the VPS is running **Ubuntu 22.04 or 24.04**. 
The following tools must be installed:
- **Docker** (Latest version)
- **Docker Compose V2**
- **Git** (for code transfer)

> [!TIP]
> Hostinger offers a "Docker on Ubuntu" OS template when setting up the VPS, which has all prerequisites pre-installed.

---

## 2. Environment Configuration (`.env`)
Before launching, update the `.env` file in the root directory with production values.

Check the env.example file for the required environment variables.

```env
# MongoDB Configuration (External Atlas or Local)
MONGODB_URI="your_production_mongodb_connection_string"
MONGODB_DB_NAME="vakmithra"

# API Configuration
API_PORT=3001

# Frontend Configuration (CRITICAL for production)
# Replace with your domain or VPS IP
VITE_API_URL="http://your-domain-or-ip:3001"
```

---

## 3. Deployment Steps

### Step A: Transfer Files
Upload the project folder to the VPS (using SCP, SFTP, or a private Git repository).
*Ensure the `dist` and `node_modules` folders are NOT uploaded (they will be built inside Docker).*

### Step B: Build and Launch
Navigate to the project directory and run the following command:

```bash
docker compose up -d --build
```

**What this does:**
1. Builds the Frontend Image (Node.js with SSR Runner).
2. Builds the Backend API Image (Express & MongoDB connection).
3. Connects them via a internal Docker network.
4. Starts the services in detached mode (`-d`).

---

## 4. Port Mapping
By default, the application uses the following ports:
- **Frontend (Website):** Port `3000`
- **Backend (API):** Port `3001`

---

## 5. Post-Deployment (Recommended)

### Configure Nginx Reverse Proxy
To allow users to access the site via standard Port 80 (HTTP) or 443 (HTTPS) without typing `:3000`, set up Nginx as a reverse proxy.

**Example Nginx Config (`/etc/nginx/sites-available/vakmithra`):**
```nginx
server {
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
    }
}
```

### SSL Setup
Run Certbot to secure the domain:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 6. Troubleshooting
Check service health using:
- `docker compose ps` (Check if containers are 'Up')
- `docker compose logs frontend` (View SSR logs)
- `docker compose logs api` (View Backend logs)
