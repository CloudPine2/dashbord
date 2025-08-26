# 🚀 CloudPine AI - Advanced RaaS Dashboard

A comprehensive Research as a Service (RaaS) platform that provides AI-powered research analysis, collaboration tools, and advanced data visualization capabilities.

![CloudPine AI](https://img.shields.io/badge/CloudPine-AI%20Dashboard-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12.1.0-orange?style=for-the-badge&logo=firebase)

## ✨ Features

### 🔐 Authentication & User Management
- **Multi-factor Authentication** - Email/password and Google OAuth
- **User Profile Management** - Customizable user information
- **Role-based Access Control** - Secure permission management
- **Session Management** - Secure token handling

### 🤖 AI-Powered Research Tools
- **Literature Review** - Automated research paper analysis
- **Data Analysis** - AI-driven statistical insights
- **Hypothesis Generation** - Intelligent research question creation
- **Knowledge Graph** - Interactive research relationship mapping
- **Citation Tracker** - Reference management and impact analysis

### 📊 Data Visualization & Analytics
- **Interactive Charts** - Dynamic data representation
- **Predictive Modeling** - Machine learning-based forecasting
- **Trend Analysis** - Pattern recognition and analysis
- **Network Analysis** - Relationship and influence mapping
- **Stock Tracker** - Real-time market monitoring

### 🛠️ Research Management Tools
- **Project Manager** - Research project organization
- **Collaboration Hub** - Team workspace and communication
- **Smart Search** - AI-powered content discovery
- **Export Tools** - Multi-format data export
- **API Integrations** - External service connections

### 📈 Business Intelligence
- **News Summarizer** - AI-powered news analysis
- **Research Trends** - Academic publishing insights
- **Impact Metrics** - Research influence measurement
- **System Health** - Performance monitoring

## 🏗️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Fast build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React components
- **Radix UI** - Accessible UI primitives

### Backend & Services
- **Firebase 12.1.0** - Authentication, hosting, backend
- **Google OAuth** - Social login integration
- **Groq API** - LLM integration for AI insights

### Data & Visualization
- **Recharts 2.15.4** - Data visualization library
- **TanStack React Query 5.83.0** - Data fetching and caching
- **React Hook Form 7.61.1** - Form management
- **Zod 3.25.76** - Schema validation

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cloudpink-backend.git
   cd cloudpink-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (see Environment Variables section below)

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

### Firebase Configuration
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### AI Services
```env
# Groq API Configuration
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### Optional Services
```env
# Analytics (Optional)
VITE_ANALYTICS_ID=your_analytics_id

# External APIs (Optional)
VITE_NEWS_API_KEY=your_news_api_key
VITE_STOCK_API_KEY=your_stock_api_key
```

### How to Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Click on the gear icon → Project Settings
4. Scroll down to "Your apps" section
5. Click "Add app" → Web app
6. Copy the configuration values


## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── TopNavbar.tsx   # Top navigation
│   └── AppSidebar.tsx  # Side navigation
├── pages/              # Route components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Login.tsx       # Authentication
│   ├── Signup.tsx      # User registration
│   └── ...            # Other feature pages
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   ├── firebase.ts     # Firebase configuration
│   └── utils.ts        # Helper functions
├── services/           # External service integrations
└── types/              # TypeScript type definitions
```

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Package Management
npm install          # Install dependencies
npm update           # Update dependencies
npm audit            # Security audit
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 🔒 Security Features

- **Authentication** - Secure user authentication with Firebase
- **Data Encryption** - End-to-end data protection
- **Access Control** - Role-based permissions
- **Session Management** - Secure token handling
- **Input Validation** - XSS and injection protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Project Wiki](https://github.com/yourusername/cloudpink-backend/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/cloudpink-backend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/cloudpink-backend/discussions)

## 🙏 Acknowledgments

- **Shadcn/ui** - Beautiful React components
- **Firebase** - Backend infrastructure
- **Groq** - AI language model services
- **Tailwind CSS** - Utility-first CSS framework

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/cloudpink-backend)
![GitHub issues](https://img.shields.io/github/issues/yourusername/cloudpink-backend)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/cloudpink-backend)
![GitHub license](https://img.shields.io/github/license/yourusername/cloudpink-backend)

---

**Made with ❤️ by the CloudPine AI Team**

*Transform your research with AI-powered insights and collaboration tools.*
