# 🌱 Plant Pantry - Your Digital Garden Paradise

> *Transform your space into a green sanctuary with our curated collection of beautiful plants*

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0.3-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Plant Pantry is a modern, full-stack web application that helps plant enthusiasts discover, catalog, and manage their plant collections. Built with cutting-edge technologies, it offers a seamless experience for browsing, searching, and organizing plants with a beautiful, responsive interface.

## ✨ What Makes Plant Pantry Special

- **🌿 Rich Plant Catalog**: Browse through a diverse collection of indoor and outdoor plants
- **🔍 Smart Search & Filtering**: Find plants by name, category, or description with real-time search
- **📱 Responsive Design**: Beautiful UI that works perfectly on desktop, tablet, and mobile
- **⚡ Real-time Updates**: Instant data synchronization with React Query
- **🎨 Modern UI/UX**: Clean, intuitive interface built with Tailwind CSS and Radix UI
- **🔄 Dynamic Categories**: Auto-generated category lists with plant counts
- **➕ Easy Management**: Add new plants with a user-friendly form
- **📊 Stock Tracking**: Monitor plant availability and stock status

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Local installation or [MongoDB Atlas](https://www.mongodb.com/atlas) account
- **Git** - For cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/plant-pantry.git
   cd plant-pantry
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   
   # Configure your environment
   cp config.env.example config.env
   # Edit config.env with your MongoDB URI
   
   # Seed the database with sample plants
   npm run seed
   
   # Start the development server
   npm run dev
   ```

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Query (TanStack Query)** - Powerful data synchronization
- **React Router** - Client-side routing
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Sonner** - Elegant toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

## 🎯 Key Features

### 🔍 Advanced Search & Filtering
- **Real-time search** across plant names, descriptions, and categories
- **Category filtering** with dynamic counts
- **Stock status filtering** (in stock/out of stock)
- **Sorting options** by name, price, or creation date

### 📱 Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Grid and list view modes** for different preferences
- **Touch-friendly interface** for mobile devices
- **Beautiful gradients and animations**

### ⚡ Performance Optimizations
- **React Query caching** for instant data access
- **Optimistic updates** for better UX
- **Lazy loading** and code splitting
- **Efficient database queries** with proper indexing

### 🎨 Modern UI Components
- **Custom design system** with consistent theming
- **Accessible components** built with Radix UI
- **Smooth animations** and transitions
- **Dark mode ready** (easily extensible)

## 📊 API Documentation

### Plants Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/plants` | Get all plants with optional filters |
| `GET` | `/api/plants/:id` | Get a specific plant by ID |
| `POST` | `/api/plants` | Create a new plant |
| `PUT` | `/api/plants/:id` | Update an existing plant |
| `DELETE` | `/api/plants/:id` | Delete a plant |
| `GET` | `/api/plants/categories/list` | Get all categories with counts |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search in name, description, or categories |
| `category` | string | Filter by specific category |
| `inStock` | boolean | Filter by stock status |
| `sort` | string | Sort field (name, price, createdAt) |
| `order` | string | Sort order (asc/desc) |

### Example API Calls

```bash
# Get all indoor plants
GET /api/plants?category=Indoor

# Search for plants with "monstera"
GET /api/plants?search=monstera

# Get plants sorted by price (high to low)
GET /api/plants?sort=price&order=desc

# Get only in-stock plants
GET /api/plants?inStock=true
```

## 🗄️ Database Schema

### Plant Model
```javascript
{
  _id: ObjectId,           // Unique identifier
  name: String,            // Plant name (required, max 100 chars)
  price: String,           // Plant price (required)
  categories: [String],    // Array of categories (required)
  inStock: Boolean,        // Stock status (default: true)
  description: String,     // Plant description (optional, max 500 chars)
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

### Available Categories
- Indoor
- Outdoor
- Succulent
- Flowering
- Low Light
- Pet Safe
- Air Purifying
- Hanging
- Large
- Small

## 🏗️ Project Structure

```
plant-pantry/
├── 📁 backend/                 # Backend API server
│   ├── 📁 models/             # Database models
│   │   └── Plant.js           # Plant schema and model
│   ├── 📁 routes/             # API routes
│   │   └── plants.js          # Plant endpoints
│   ├── 📁 scripts/            # Utility scripts
│   │   ├── seed.js            # Database seeding
│   │   └── fixIndexes.js      # Database optimization
│   ├── config.env             # Environment variables
│   ├── package.json           # Backend dependencies
│   └── server.js              # Express server
├── 📁 frontend/               # React frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/     # React components
│   │   │   ├── 📁 ui/         # Reusable UI components
│   │   │   ├── PlantCard.tsx  # Plant display card
│   │   │   ├── PlantCatalog.tsx # Main catalog view
│   │   │   ├── SearchBar.tsx  # Search functionality
│   │   │   └── CategoryFilter.tsx # Category filtering
│   │   ├── 📁 hooks/          # Custom React hooks
│   │   │   └── usePlants.ts   # Plant data management
│   │   ├── 📁 services/       # API services
│   │   │   └── api.ts         # HTTP client
│   │   ├── 📁 types/          # TypeScript type definitions
│   │   │   └── plant.ts       # Plant-related types
│   │   └── 📁 assets/         # Static assets
│   │       └── *.jpg          # Plant images
│   ├── package.json           # Frontend dependencies
│   └── vite.config.ts         # Vite configuration
└── README.md                  # This file
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. **Set environment variables:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=production
   ```

2. **Deploy:**
   ```bash
   cd backend
   git add .
   git commit -m "Deploy backend"
   git push heroku main  # or your platform
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred platform

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests if applicable
4. **Commit your changes:** `git commit -m 'Add amazing feature'`
5. **Push to the branch:** `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed
- Ensure accessibility standards are met

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB is running
- Verify your `config.env` file has the correct MongoDB URI
- Ensure all dependencies are installed with `npm install`

**Frontend build errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`
- Verify all imports are correct

**Database connection issues:**
- Test your MongoDB connection string
- Check if your IP is whitelisted (for MongoDB Atlas)
- Verify database permissions

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Plant images** - Beautiful stock photos for demonstration
- **Tailwind CSS** - For the amazing utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **React Query** - For powerful data synchronization
- **Vite** - For the lightning-fast build tool

## 📞 Support

If you have any questions or need help:

- **Open an issue** on GitHub
- **Check the documentation** above
- **Review the code** for examples

---

**Made with ❤️ by plant lovers, for plant lovers**

*Happy gardening! 🌱*
