# FUNDamentals Frontend

This is the React frontend for the FUNDamentals financial education platform, migrated from PHP to a modern JavaScript stack for Netlify deployment.

## 🚀 Migration from PHP to Netlify

### What Changed

- **Backend**: PHP (Fat-Free Framework) → React + Netlify Functions
- **Database**: MySQL → Supabase (PostgreSQL) or PlanetScale (MySQL)
- **Hosting**: Edinburgh Domains → Netlify
- **Authentication**: PHP Sessions → JWT Tokens
- **Architecture**: Server-side rendering → Single Page Application (SPA)

### Migration Benefits

- ✅ **Better Performance**: Static hosting with CDN
- ✅ **Scalability**: Serverless functions auto-scale
- ✅ **Modern Development**: React ecosystem
- ✅ **Cost Effective**: Free tier hosting
- ✅ **Easy Deployment**: Git-based deployments

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router, Vite
- **Styling**: CSS3 with responsive design
- **Authentication**: JWT tokens
- **API**: Netlify Functions
- **Database**: Supabase/PlanetScale (to be configured)

## 📁 Project Structure

```
FUNDamentals-frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── contexts/      # React contexts (Auth)
│   ├── services/      # API services
│   └── assets/        # Static assets
├── netlify/
│   └── functions/     # Serverless API functions
├── public/            # Public assets
└── dist/              # Build output
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Netlify CLI (for deployment)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd FUNDamentals-frontend
   npm install
   ```

2. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Start Netlify Functions locally:**
   ```bash
   netlify dev
   ```

## 🗄️ Database Migration

### Option 1: Supabase (Recommended)

1. **Create Supabase account:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Get your API keys

2. **Set up environment variables:**
   ```bash
   # In Netlify dashboard or .env file
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Database schema migration:**
   ```sql
   -- Users table
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(50) UNIQUE NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     onboarding_completed BOOLEAN DEFAULT FALSE,
     goal TEXT,
     confidence INTEGER,
     learning_style VARCHAR(50),
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Module progress
   CREATE TABLE module_progress (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id),
     budgeting_progress INTEGER DEFAULT 0,
     savings_progress INTEGER DEFAULT 0,
     investing_progress INTEGER DEFAULT 0,
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Game scores
   CREATE TABLE game_scores (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id),
     game_name VARCHAR(50) NOT NULL,
     score INTEGER NOT NULL,
     final_value DECIMAL(10,2),
     years_played INTEGER,
     profit_loss DECIMAL(10,2),
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Quiz results
   CREATE TABLE quiz_results (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id),
     module VARCHAR(50) NOT NULL,
     quiz_type VARCHAR(20) NOT NULL,
     answers JSONB,
     score INTEGER NOT NULL,
     total_questions INTEGER NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Option 2: PlanetScale (MySQL Compatible)

1. **Create PlanetScale account:**
   - Go to [planetscale.com](https://planetscale.com)
   - Create new database
   - Get connection string

2. **Set up environment variables:**
   ```bash
   DATABASE_URL=your_planetscale_connection_string
   ```

## 🌐 Netlify Deployment

### 1. Connect to Git Repository

1. **Push to GitHub/GitLab:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your_repo_url
   git push -u origin main
   ```

2. **Connect Netlify to your repo:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

### 2. Environment Variables

Set these in Netlify dashboard:

```bash
# JWT Secret (generate a strong one)
JWT_SECRET=your_very_secure_jwt_secret

# Database (choose one)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# OR for PlanetScale
DATABASE_URL=your_planetscale_connection_string
```

### 3. Deploy

```bash
# Deploy to production
netlify deploy --prod

# Or push to main branch (auto-deploy)
git push origin main
```

## 🔧 Development Workflow

### Local Development

1. **Frontend:**
   ```bash
   npm run dev          # Start React dev server
   ```

2. **Backend Functions:**
   ```bash
   netlify dev          # Start Netlify Functions locally
   ```

3. **Database:**
   - Use Supabase local development or
   - Connect to remote database

### Testing

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Test Netlify Functions locally
netlify dev
```

## 📱 Features Implemented

- ✅ User authentication (login/register)
- ✅ JWT token management
- ✅ Protected routes
- ✅ Responsive sidebar navigation
- ✅ Landing page
- ✅ Basic routing structure

## 🚧 Next Steps

1. **Complete Page Components:**
   - Dashboard
   - Modules (Budgeting, Saving, Investing)
   - Games (Stock Market, Budget Blitz, FOMO Fighter)
   - Simulations
   - Profile
   - Vocabulary

2. **Database Integration:**
   - Replace mock data with real database
   - Implement CRUD operations
   - Add data validation

3. **Game Logic:**
   - Port existing game logic from PHP
   - Implement real-time updates
   - Add progress tracking

4. **Content Management:**
   - Educational content
   - Quiz questions
   - Progress tracking

## 🔒 Security Considerations

- ✅ JWT tokens with expiration
- ✅ Password hashing with bcrypt
- ✅ Protected API endpoints
- ✅ CORS configuration
- ⚠️ Environment variables for secrets
- ⚠️ Input validation and sanitization
- ⚠️ Rate limiting (implement in production)

## 📞 Support

For migration assistance or questions:
1. Check Netlify documentation
2. Review Supabase/PlanetScale guides
3. Check React and Vite documentation

## 🎯 Migration Checklist

- [x] Create React frontend structure
- [x] Set up routing and authentication
- [x] Create Netlify Functions
- [x] Set up Netlify configuration
- [ ] Choose and configure database
- [ ] Migrate existing data
- [ ] Complete all page components
- [ ] Test all functionality
- [ ] Deploy to production
- [ ] Update DNS and domain
- [ ] Monitor and optimize

---

**Note**: This is a work in progress. The basic structure is in place, but you'll need to complete the remaining components and database integration based on your specific requirements.
