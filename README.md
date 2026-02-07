# Todo+AI - AI-Powered Task Management Application

A sophisticated full-stack todo application with AI-powered assistance, designed with modern web technologies and best practices for productivity enhancement.

## 🚀 Features

- **AI-Powered Task Management**: Intelligent assistance for task creation and organization
- **Real-time Todo Management**: Add, edit, delete, and mark tasks as complete
- **Advanced Filtering & Sorting**: Filter todos by priority, tags, due dates, and more
- **Authentication System**: Secure user authentication and authorization
- **Responsive Design**: Fully responsive UI that works on all devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Search Functionality**: Quickly find todos by title or description
- **Priority Management**: Set task priorities (low, medium, high)
- **Tagging System**: Organize todos with customizable tags
- **Due Dates**: Track important deadlines with calendar integration

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and lifecycle

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Prisma ORM** - Database toolkit
- **PostgreSQL/NeonDB** - Database solution

### Authentication
- **JWT** - Token-based authentication
- **Secure Session Management**

### AI Integration
- **OpenAI API** - Intelligent task assistance
- **Natural Language Processing** - Smart task interpretation

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- PostgreSQL database (or NeonDB account)
- OpenAI API key (for AI features)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd todo-phase-3-4-5
```

### 2. Install Dependencies
```bash
# Navigate to frontend directory
cd frontend
npm install

# Navigate to backend directory
cd ../backend
npm install
```

### 3. Environment Configuration
Create `.env` files in both frontend and backend directories:

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret
```

**Backend (.env):**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/todo_db"
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
PORT=3001
NODE_ENV=development
```

### 4. Database Setup
```bash
# Navigate to backend directory
cd backend

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push
```

### 5. Run the Application

**Start the backend server:**
```bash
cd backend
npm run dev
```

**Start the frontend development server:**
```bash
cd frontend
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
todo-phase-3-4-5/
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── components/       # Reusable React components
│   │   │   ├── todos/        # Todo-specific components
│   │   │   ├── ui/           # UI components
│   │   │   └── chat/         # Chatbot components
│   │   ├── services/         # API services
│   │   ├── utils/            # Utility functions
│   │   └── styles/           # Global styles
│   ├── public/               # Static assets
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Middleware functions
│   │   └── utils/           # Utility functions
│   └── package.json
├── specs/                   # Specification files
├── history/                 # Project history
└── README.md
```

## 🔧 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Backend
```bash
npm run dev          # Start development server
npm run start        # Start production server
npm run test         # Run tests
npm run migrate      # Run database migrations
```

## 🤖 AI Features

The application integrates with OpenAI to provide intelligent task assistance:

- **Smart Task Creation**: Natural language processing for creating tasks
- **Task Suggestions**: AI-powered recommendations for task organization
- **Intelligent Prioritization**: Automatic priority suggestions based on context

## 🎨 Design Principles

- **Clean & Minimal**: Uncluttered interface focused on productivity
- **Intuitive Navigation**: Easy-to-understand user flow
- **Responsive Layout**: Works seamlessly across all device sizes
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **Performance**: Optimized for fast loading and smooth interactions

## 🛡️ Security

- JWT-based authentication
- Secure password hashing
- Input validation and sanitization
- CSRF protection
- Rate limiting for API endpoints

## 🧪 Testing

- Unit tests for core functionality
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Accessibility testing

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop browsers
- Tablets
- Mobile phones
- Touch interactions

## 🚀 Deployment

### Vercel (Frontend)
```bash
# Deploy to Vercel
npm install -g vercel
vercel
```

### Railway/DigitalOcean (Backend)
Configure environment variables and deploy the Express.js application.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

If you encounter any issues, please open an issue in the GitHub repository with:
- Detailed description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please contact:
- Open an issue in the GitHub repository
- Join our community Discord (if available)
- Email: support@todoplusai.com (example)

---

Made with ❤️ using Next.js, TypeScript, and Tailwind CSS