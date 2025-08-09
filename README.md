# 2K26 Tournament Series Frontend

This is the official frontend for the 2K26 Tournament Series, built with Next.js 14, Tailwind CSS, and Supabase authentication with Discord OAuth integration. The frontend now includes a comprehensive admin dashboard for managing players, teams, events, matches, and statistics.

## Features

- **Modern UI**: Mobile-first, responsive design with Tailwind CSS and shadcn/ui components
- **Authentication**: Supabase authentication with Discord OAuth integration
- **Admin Dashboard**: Comprehensive administrative interface for tournament management
- **Dark Mode**: Theme toggle with system preference detection
- **Tournament Content**: Pages for tournament format, schedule, bracket, teams, standings, and rankings
- **Media Section**: MDX-powered media recaps with rich content formatting
- **Protected Routes**: User profiles and settings pages with authentication checks
- **Statistics Management**: Complete player and team statistics tracking and entry

## Admin Dashboard Features

### Player Management

- View all players with pagination
- Create and update player profiles
- Manage player statistics
- RP (Ranking Points) adjustments
- Player search and filtering

### Team Management

- Create and manage teams
- Team roster management
- Team statistics tracking
- Team performance analytics

### Event Management

- Create and manage tournaments
- Event scheduling and configuration
- Group management for tournaments
- Event results tracking

### Match Management

- Match creation and scheduling
- Match result entry
- Player statistics entry
- Team statistics tracking
- Match MVP selection

### Statistics Management

- Comprehensive player statistics entry
- Team match statistics
- Performance analytics
- Data export capabilities

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for authentication)
- Discord Developer Application (for OAuth)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/2k26-frontend.git
cd 2k26-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard pages
│   │   ├── layout.tsx      # Admin layout with sidebar
│   │   ├── page.tsx        # Admin dashboard home
│   │   ├── players/        # Player management pages
│   │   ├── teams/          # Team management pages
│   │   ├── events/         # Event management pages
│   │   ├── matches/        # Match management pages
│   │   └── stats/          # Statistics management pages
│   ├── auth/               # Authentication routes
│   ├── login/              # Login page
│   ├── media/              # Media recaps section
│   ├── profile/            # User profile page
│   ├── rankings/           # Player/team rankings
│   ├── settings/           # User settings
│   ├── standings/          # Tournament standings
│   ├── teams/              # Team profiles
│   └── tournament/         # Tournament info pages
├── components/             # Reusable components
│   ├── admin/              # Admin-specific components
│   │   ├── admin-dashboard.tsx
│   │   ├── admin-sidebar.tsx
│   │   └── player-stats-form.tsx
│   ├── auth/               # Authentication components
│   ├── layout/             # Layout components
│   ├── mdx/                # MDX rendering components
│   ├── teams/              # Team-related components
│   ├── theme/              # Theme components
│   └── ui/                 # UI components (shadcn)
├── content/                # Content files
│   └── posts/              # MDX blog posts
├── context/                # React context providers
├── lib/                    # Utility functions
│   ├── mdx.ts              # MDX processing utilities
│   └── supabase.ts         # Supabase client
├── services/               # API service layer
│   ├── admin-service.ts    # Admin API services
│   ├── api-client.ts       # Base API client
│   ├── auth-service.ts     # Authentication services
│   ├── events-service.ts   # Event management services
│   ├── leaderboard-service.ts
│   ├── matches-service.ts  # Match management services
│   ├── players-service.ts  # Player management services
│   └── teams-service.ts    # Team management services
└── types/                  # TypeScript type definitions
    └── schema.ts           # Database schema types
```

## Database Schema

The frontend is built to work with a comprehensive database schema that includes:

### Core Entities

- **Players**: Player profiles with statistics and rankings
- **Teams**: Team information with rosters and performance
- **Events**: Tournaments and competitions
- **Matches**: Individual game results and statistics
- **Player Stats**: Detailed player performance metrics
- **Team Stats**: Team-level performance tracking

### Management Features

- **Event Groups**: Tournament bracket management
- **Group Standings**: Team rankings within groups
- **RP Transactions**: Ranking points tracking
- **Awards Race**: Player and team awards
- **Draft Pool**: Player draft management
- **Match Submissions**: Result submission workflow

## API Integration

The frontend integrates with the backend API through a comprehensive service layer:

### Service Architecture

- **api-client.ts**: Base HTTP client with authentication
- **admin-service.ts**: Administrative operations
- **players-service.ts**: Player management
- **teams-service.ts**: Team management
- **events-service.ts**: Event management
- **matches-service.ts**: Match management

### Authentication

- Supabase authentication with Discord OAuth
- Role-based access control for admin features
- Protected routes for administrative functions

## Admin Dashboard Usage

### Accessing the Admin Dashboard

1. Navigate to `/admin` in your browser
2. Ensure you have admin privileges in your user profile
3. Use the sidebar navigation to access different admin features

### Key Admin Functions

- **Dashboard Overview**: View system statistics and recent activity
- **Player Management**: Create, update, and manage player profiles
- **Team Management**: Handle team rosters and team operations
- **Event Management**: Create and configure tournaments
- **Match Management**: Schedule matches and enter results
- **Statistics Entry**: Comprehensive statistics tracking

## Deployment

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. In your Supabase dashboard, go to Authentication → Providers → Discord
3. Enable Discord Auth and add your Discord OAuth credentials
4. Set the callback URL to `https://your-domain.com/auth/callback`
5. Copy your Supabase URL and anon key to your environment variables

### Discord Developer Portal Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Under OAuth2, add a redirect URL: `https://your-supabase-project.supabase.co/auth/v1/callback`
4. Copy your Client ID and Client Secret to your Supabase Discord provider settings

### Environment Variables

For production deployment, ensure you have these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
```

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Configure the environment variables
5. Click "Deploy" and wait for the build to complete

### Deploying to Cloudflare Pages

1. Push your code to a GitHub repository
2. Visit [Cloudflare Pages](https://pages.cloudflare.com) and sign in
3. Click "Create a project" and connect your GitHub account
4. Select your repository and configure the build settings:
   - Build command: `npm run build`
   - Build output directory: `.next`
5. Add the environment variables
6. Click "Save and Deploy"

## Development

### TypeScript

The project uses TypeScript for type safety. All API responses and database entities are properly typed using the schema definitions in `src/types/schema.ts`.

### Component Library

The UI is built using shadcn/ui components, providing a consistent and accessible design system.

### State Management

React hooks and context are used for state management, with services handling API communication.

### Testing

Run tests with:

```bash
npm test
```

### Linting

The project uses ESLint for code quality:

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
