# TaskFlow Frontend

A unique, modern task management interface built with React, featuring a distinctive dark theme with neon accents and smooth animations.

## Features

- 🎨 **Unique Design**: Dark theme with neon accents, glass morphism effects, and custom animations
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Updates**: Instant task creation, editing, and deletion
- 🔍 **Advanced Filtering**: Filter by status, priority, and sort by various criteria
- 📅 **Due Date Support**: Set and track task deadlines with overdue indicators
- 🎯 **Priority Levels**: High, medium, and low priority tasks with visual indicators
- ✨ **Smooth Animations**: Powered by Framer Motion for delightful interactions

## Tech Stack

- **React 18** - Modern React with hooks
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API communication
- **Date-fns** - Date formatting and manipulation
- **CSS Variables** - Dynamic theming system

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Header.js       # App header with branding
│   │   ├── TaskBoard.js    # Main task display grid
│   │   ├── TaskCard.js     # Individual task card component
│   │   └── TaskForm.js     # Task creation/editing form
│   ├── services/
│   │   └── api.js          # API service configuration
│   ├── styles/
│   │   └── global.css      # Global styles and theme
│   ├── App.js              # Main app component
│   └── index.js            # App entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## API Integration

The frontend connects to a backend API with the following endpoints:

- `GET /todos` - Fetch all tasks
- `POST /todos` - Create a new task
- `PUT /todos/:id` - Update a task
- `DELETE /todos/:id` - Delete a task

## Design Philosophy

This frontend breaks away from typical task management app designs by:

- **Avoiding Bootstrap/Material Design**: Custom CSS with unique color schemes
- **Dark Theme with Personality**: Deep space-inspired colors with neon accents
- **Micro-interactions**: Hover effects, button animations, and smooth transitions
- **Glass Morphism**: Modern frosted glass effects for cards and panels
- **Custom Icons**: Using emojis strategically for visual interest
- **Typography Hierarchy**: Clear information architecture with custom fonts

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (irreversible)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to customize the design further by modifying the CSS variables in `global.css` or adding new components to match your vision.