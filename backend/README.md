# TaskFlow - Docker to AWS Deployment

A complete task management application with a unique, modern frontend and robust backend API, containerized with Docker and ready for AWS deployment.

## 🏗️ Architecture

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React with custom design system
- **Containerization**: Docker + Docker Compose
- **Deployment**: Ready for AWS (ECS, ECR, etc.)

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js (for local development)
- MongoDB (handled by Docker)

### Option 1: Docker Compose (Recommended)

```bash
# Clone and navigate to project
cd "Docker to AWS Deployment"

# Start all services
docker-compose up --build

# Access the application:
# Frontend: http://localhost:3001
# Backend API: http://localhost:3000
```

### Option 2: Local Development

```bash
# Start MongoDB (via Docker)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Set environment variable
export MONGO_URI="mongodb://localhost:27017/taskflow"

# Start backend
npm install
npm run dev

# In another terminal, start frontend
cd frontend
npm install
npm start
```

## 🎨 Frontend Features

- **Unique Design**: Dark theme with neon accents, glass morphism effects
- **Responsive**: Mobile-first design that works on all devices
- **Real-time Updates**: Instant task synchronization
- **Advanced Filtering**: Filter by priority, status, and sort options
- **Priority Management**: Visual priority indicators (High 🔴, Medium 🟡, Low 🟢)
- **Due Date Tracking**: Set deadlines with overdue notifications
- **Smooth Animations**: Powered by Framer Motion

## 🔧 Backend Features

- **RESTful API**: Complete CRUD operations for tasks
- **MongoDB Integration**: Document-based storage with Mongoose
- **Error Handling**: Comprehensive error responses and logging
- **Validation**: Input validation and sanitization
- **Health Checks**: API status monitoring
- **Graceful Shutdown**: Proper process termination

## 📁 Project Structure

```
.
├── docker-compose.yml          # Multi-service container setup
├── Dockerfile                  # Backend containerization
├── server.js                   # Backend entry point
├── package.json               # Backend dependencies
├── src/                       # Backend source code
│   ├── app.js                 # Express app configuration
│   ├── db.js                  # Database connection
│   ├── models/                # Mongoose models
│   ├── controllers/           # Route handlers
│   └── routes/                # API routes
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API client
│   │   └── styles/            # Global styles
│   └── package.json
├── start-dev.sh              # Development startup script
└── README.md                 # This file
```

## 🐳 Docker Deployment

### Build and Run

```bash
# Build images
docker-compose build

# Run services
docker-compose up

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://mongodb:27017/taskflow
NODE_ENV=production
PORT=3000
```

## ☁️ AWS Deployment

### Prerequisites
- AWS CLI configured
- ECR repository created
- ECS cluster set up

### Deploy Steps

1. **Build and push Docker image to ECR**
   ```bash
   # Authenticate Docker with ECR
   aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com

   # Tag and push
   docker tag taskflow-backend:latest your-account-id.dkr.ecr.your-region.amazonaws.com/taskflow-backend:latest
   docker push your-account-id.dkr.ecr.your-region.amazonaws.com/taskflow-backend:latest
   ```

2. **Update ECS task definition** with the new image URI

3. **Deploy frontend** to S3 + CloudFront or use AWS Amplify

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/todos` | Get all tasks |
| POST | `/todos` | Create task |
| PUT | `/todos/:id` | Update task |
| DELETE | `/todos/:id` | Delete task |

### Task Object
```json
{
  "_id": "string",
  "title": "string",
  "completed": false,
  "priority": "medium",
  "dueDate": "2024-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🎯 Development

### Backend
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm test           # Run tests
```

### Frontend
```bash
cd frontend
npm install         # Install dependencies
npm start          # Start development server
npm build          # Build for production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own deployments!

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
- Ensure MongoDB is running
- Check MONGO_URI environment variable
- Verify network connectivity in Docker

**Port Already in Use**
- Change ports in docker-compose.yml
- Kill existing processes: `lsof -ti:3000 | xargs kill`

**Frontend Not Loading**
- Check if backend is running on port 3000
- Verify CORS settings
- Check browser console for errors

### Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
```

---

Built with ❤️ for modern web development and cloud deployment