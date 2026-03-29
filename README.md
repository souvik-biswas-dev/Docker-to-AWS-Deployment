# TaskFlow - Docker to AWS Deployment

A full-stack task management application with Docker containerization and AWS deployment ready setup.

## 📋 Project Overview

TaskFlow is a modern task management application consisting of:
- **Backend**: REST API built with Node.js, Express, and MongoDB
- **Frontend**: React-based UI

## 🏗️ Project Structure

```
Docker to AWS Deployment/
├── backend/
│   ├── src/
│   │   ├── app.js           # Express app configuration
│   │   ├── db.js            # Database connection
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB schemas
│   │   └── routes/          # API routes
│   ├── server.js            # Server entry point
│   ├── package.json         # Dependencies
│   ├── Dockerfile           # Docker configuration
│   └── .dockerignore
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service calls
│   │   ├── styles/          # CSS styles
│   │   ├── App.js
│   │   └── index.js
│   ├── public/              # Static files
│   ├── package.json
│   ├── Dockerfile           # Docker configuration
│   ├── nginx.conf           # Nginx server config
│   └── .dockerignore
│
├── docker-compose.yml       # Container orchestration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Docker & Docker Compose
- MongoDB (for local development)

### Local Development Setup

#### Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:3000`

#### Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on `http://localhost:3000`

### Docker Setup

#### Build and Run with Docker Compose
```bash
docker-compose up --build
```

#### Individual Docker Builds

**Backend:**
```bash
docker build -t task-api:latest ./backend
docker run -p 3000:3000 task-api:latest
```

**Frontend:**
```bash
docker build -t taskflow-frontend:latest ./frontend
docker run -p 80:80 taskflow-frontend:latest
```

## 📦 Tech Stack

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB (Mongoose 9.3.3)
- **CORS**: Enabled for frontend communication
- **Environment**: Dotenv for configuration

### Frontend
- **Framework**: React 18.2.0
- **Styling**: Emotion (CSS-in-JS)
- **HTTP Client**: Axios
- **Animation**: Framer Motion
- **Date Handling**: date-fns
- **Server**: Nginx (production)

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Todo Endpoints
- `GET /todos` - Fetch all tasks
- `POST /todos` - Create a new task
- `GET /todos/:id` - Fetch specific task
- `PUT /todos/:id` - Update a task
- `DELETE /todos/:id` - Delete a task

## 🐳 Docker Configuration

### Backend Dockerfile
- Multi-stage build for optimized image size
- Alpine Linux for minimal footprint
- Non-root user for security
- Health checks configured
- Port: 3000

### Frontend Dockerfile
- Node.js alpine for build stage
- Nginx alpine for production serving
- Optimized caching strategies
- Gzip compression enabled
- Port: 80

### Docker Compose
Orchestrates both services with:
- Network isolation
- Volume management
- Environment variables
- Port mapping

## 🌐 Environment Variables

### Backend (.env)
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskdb
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3000/api
```

## 📝 Scripts

### Backend
```bash
npm start        # Production server
npm run dev      # Development server with nodemon
npm test         # Run tests
```

### Frontend
```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
```

## 🚀 AWS Deployment

The application is configured for AWS deployment:
- Docker images ready for:
  - Amazon ECR (Elastic Container Registry)
  - Amazon ECS (Elastic Container Service)
  - AWS AppRunner
- Environment-based configuration
- Production-ready security settings
- Health checks for load balancing

### Deployment Steps
1. Build Docker images
2. Push to Amazon ECR
3. Create ECS tasks/services
4. Configure load balancer
5. Set up RDS for MongoDB or DocumentDB

## 🔒 Security Features

- Non-root user in containers
- CORS configuration
- Environment variable management
- Health checks for container orchestration
- Nginx security headers (in frontend)

## 📊 Performance Optimization

- Multi-stage Docker builds
- Gzip compression in Nginx
- Optimized caching strategies
- Lightweight Alpine Linux images
- Production build optimization for React

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env or docker-compose.yml
# Kill existing process: lsof -i :3000 | kill -9 <PID>
```

### Database Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify network connectivity

### Build Failures
- Clear Docker cache: `docker system prune`
- Check Node version compatibility
- Verify npm packages lock files

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [Nginx Configuration](https://nginx.org/en/docs)

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

souvik-biswas

---

**Note**: Update environment variables and configuration before deploying to production.
