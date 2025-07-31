# InnerGlow_nazira

# 🧠 MindTrack – Mental Health & Mood Tracker

Welcome to **MindTrack**, a simple mental health web application that provides motivational quotes, mental health tips, and a safe space for self-reflection.

---

## 📦 Docker Image

- **Docker Hub Repo**: [https://hub.docker.com/repository/docker/nazira12/innerglow-site/general](https://hub.docker.com/repository/docker/nazira12/innerglow-site/general)
- **Image name**: `nazira12/innerglow-site`
- **Tag**: `latest`

---

## 🛠️ Build Instructions

To build the Docker image locally:

```bash
docker build -t nazira12/innerglow-site:latest .
```

---

## 🖥️ Run Locally (Port 8080)

To test locally on your machine:

```bash
docker run -d -p 8080:80 --name innerglow-site nazira12/innerglow-site:latest
```

Visit: [http://localhost:8080](http://localhost:8080)

---

## 🚀 Deployment on Web Servers (web01 & web02)

On **web01** and **web02**, run:

```bash
docker run -d --name innerglow-web -p 8080:80 nazira12/innerglow-site:latest
```

### ✅ Verify App Reachability Internally:

```bash
curl http://localhost:8080
```

Or from the **load balancer container**, use Docker DNS:

```bash
curl http://web01
curl http://web02
```

---

## ⚖️ Load Balancer Configuration (Nginx)

We used NGINX to balance traffic between the two app containers in a round-robin strategy.

### 🔧 Nginx Config (`loadbalancer/nginx.conf`):

```nginx
events {}

http {
    upstream backend {
        server web01:80;
        server web02:80;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
        }
    }
}
```

### ▶️ Run Load Balancer Container

```bash
docker run -d --name innerglow-loadbalancer --link web01 --link web02 -p 8084:80 \
-v $(pwd)/loadbalancer/nginx.conf:/etc/nginx/nginx.conf:ro nginx:alpine
```

---

## ✅ Testing & Logs

Check the application through the load balancer:

```powershell
curl http://localhost:8084
```

### 🧾 Sample Successful Response Log:

```powershell
StatusCode        : 200
StatusDescription : OK
Content           : <!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                      <title>MindTrack – Mood Tracker & Mental Health Tips</title>
...
```

This confirms the load balancer is working correctly and routing traffic to your application.

---

## 🔐 Security & Best Practices

- Store **API keys and secrets** using environment variables or `.env` files (not in code).
- Use lightweight base images like `nginx:alpine` to reduce image size.
- Separate app logic and load balancer configuration for flexibility.
- Use Docker volumes for any persistent data (if needed).

---

## 📚 APIs & Resources Used

This project uses three public APIs to enhance the user experience with dynamic content:

✅ 1. Affirmations API
Purpose: Displays a random positive affirmation to uplift the user.
Usage: Fetched on-demand when the user clicks the "Get Affirmation" button.

CORS Handling: Requests are routed through a CORS proxy for development:
https://cors-anywhere.herokuapp.com/https://www.affirmations.dev/

✅ 2. Useless Facts API
Purpose: Provides a random fun fact for light entertainment.
https://uselessfacts.jsph.pl/api/v2/facts/random?language=en

✅ 3. Official Joke API
Purpose: Displays a random joke to make users smile.
https://official-joke-api.appspot.com/jokes/random


### Other Assets:

- Icons from [FontAwesome](https://fontawesome.com)
- Fonts from [Google Fonts](https://fonts.google.com)

---

##  Youtube
    Demo video: https://youtu.be/viu6YZkGICc
---
## 🧩 Challenges & Solutions

| Challenge                         | Solution                                                   |
|----------------------------------|-------------------------------------------------------------|
| API connectivity issues          | Used locally stored static quotes and tips                 |
| Load balancer not forwarding     | Fixed `proxy_pass` and verified `upstream` block in Nginx  |
| DNS resolution inside containers | Used Docker `--link` and verified with internal `curl`     |
| Deployment verification          | Used `curl` and PowerShell commands to confirm HTTP status |

---

## 👩‍💻 Author

**Nazira Umucyo**  
GitHub: [https://github.com/Nazira-umucyo](https://github.com/Nazira-umucyo)

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## 💙 Thank You!

Thank you for checking out **MindTrack**!  
Built with care to promote mental well-being and positivity. ✨
