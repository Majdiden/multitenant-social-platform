# Multi-tenant Social Platform (Discord as use-case)
Preview the app here: [https://multitenant-social-platform.vercel.app](https://multitenant-social-platform.vercel.app)

## Architecture Overview
The application implements a multi-tenant system where each server (tenant) operates in isolation with its own:
- Channel management system
- User authentication and authorization
- Dedicated URL routing (`/{tenantId}`)

## Core Features
### Multi-tenant Authentication
The authentication system manages tenant-specific user sessions:
- Server registration with unique tenant names
- Tenant-specific login system with email/password
- JWT token management with localStorage persistence
- Token-based API request authorization
- Automatic routing to tenant-specific pages

### Channel Management
Each tenant can manage their communication channels through:
- Channel creation with name and type specification
- Channel listing with tenant-specific views

### Routing System
The application implements a dynamic routing system:
- Root route (`/signup`) for server registration
- Tenant-specific routes (`/{tenantId}`) for server operations
- Channel-specific routes (`/{tenantId}/{channelId}`) for messaging
- Protected routes with authentication checks
- Login routes (`/{tenantId}/login`) for tenant access

## Component Structure
### Core Components
1. **Layout Components**:
   - `RootLayout`: Base application shell with QueryProvider
   - `TenantLayout`: Tenant-specific layout with sidebar and channel list
   
2. **Authentication Components**:
   - `SignupPage`: Server creation interface
   - `LoginPage`: Tenant-specific login form
   - Both using shadcn/ui components for consistent styling

3. **Communication Components**:
   - `ChatArea`: Real-time messaging interface
   - `ChannelList`: Channel navigation sidebar
   - `Sidebar`: Server management tools
   - `CreateChannelModal`: Channel creation interface

### Key Features Implementation
1. **ChatArea** (`ChatArea.tsx`):
```typescript
- Real-time message fetching using TanStack Query
- Message sending with optimistic updates
- Avatar and timestamp display
- Loading states management
```

2. **Channel Management** (`ChannelList.tsx`):
```typescript
- Dynamic channel fetching based on tenant
- Automatic first channel selection
- Active channel highlighting
- Error state handling
```

3. **Server Controls** (`Sidebar.tsx`):
```typescript
- Channel creation trigger
- Logout functionality
- Tooltip-enhanced UI elements
```

## State Management
The application uses TanStack Query for server state management:
- Message caching and invalidation
- Channel list synchronization
- Optimistic updates for message sending
- Loading and error states

## API Integration
The API integration is handled through:
- Axios for HTTP requests
- Automatic token injection in request headers
- Tenant-specific endpoint handling:
  ```typescript
  - GET /{tenantId} - Fetch channels
  - GET /{tenantId}/{channelId}/messages - Fetch messages
  - POST /{tenantId}/{channelId} - Send message
  - POST /{tenantId} - Create channel
  ```

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/Majdiden/multitenant-social-platform.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`


## Authentication Flow
1. Server Creation:
   - User provides server name (tenant ID)
   - Email and password registration
   - Automatic redirect to login

2. Server Access:
   - Tenant-specific login page (/tenant/login)
   - JWT token generation
   - Secure local storage
   - Automatic channel routing
