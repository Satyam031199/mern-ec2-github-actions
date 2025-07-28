
# 🚀 Full-Stack App Deployment on AWS EC2 with GitHub Actions

This guide walks you through deploying a full-stack (MERN-style) application to an AWS EC2 instance using a GitHub self-hosted runner.

---

## 🛠️ 1. Setup the Full Stack App

Make sure your project has the following structure:

```

MernProjectDeploy/
├── client/        # React frontend (Vite or CRA)
├── server/        # Node.js backend (Express)
├── .github/
│   └── workflows/
│       └── main.yml
└── README.md

````

## ☁️ 2. Create EC2 Instance

* Go to [AWS EC2 Console](https://console.aws.amazon.com/ec2/)
* Launch an **Ubuntu 22.04** instance.
* Allow inbound rules for:

  * HTTP (80)
  * HTTPS (443)
  * SSH (22) for access

---

## 📦 3. Install Dependencies on EC2

SSH into your EC2 instance and run:

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt install nodejs -y
sudo apt install nginx -y
sudo npm i -g pm2
```

---

## 🌐 4. Configure Nginx

Edit the Nginx config:

```bash
sudo nano /etc/nginx/sites-available/default
```

```nginx
server {
    listen 80;
    server_name <EC2-public-ip>;

    root <Path to frontend dist folder>;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:8000;  # or your backend port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

If Nginx is giving 500 Internal Error: Give the permissions

```bash
sudo chmod -R 755 /home
sudo chmod -R 755 /home/ubuntu/
sudo chmod -R 755 /home/ubuntu/mern-ec2-github-actions/
sudo chmod -R 755 /home/ubuntu/mern-ec2-github-actions/client/
sudo chmod -R 755 /home/ubuntu/mern-ec2-github-actions/client/dist
sudo chown -R www-data:www-data /home/ubuntu/mern-ec2-github-actions/client/dist
```
---

## 🚀 5. Access Your App

* Frontend: `http://<your-ec2-ip>/`
* API Endpoint: `http://<your-ec2-ip>/api/health`

---

## 🚀 6. Configure the secrets in Github Action

## ✅ Optional Enhancements

* Add HTTPS using Let's Encrypt with Certbot
* Use environment variables securely via GitHub Secrets
* Add CI checks (e.g., tests, lint) before deployment

---

## 📌 Notes

* Make sure your backend listens on `0.0.0.0` not `localhost`
* Frontend should use `/api` as the base for API calls
* Use `.env` with `VITE_API_URL=/api` to simplify backend URL handling

---
