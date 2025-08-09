# Admin Access Control

## How Admin Access is Determined

The application uses a multi-layered approach to determine admin access:

### 1. **Frontend Admin Check (Primary)**

- **Location**: `src/context/auth-context.tsx`
- **Method**: Checks user metadata and email against hardcoded admin list
- **Admin Emails**:
  - `christian@bodegacatsgc.gg`
  - `admin@bodegacatsgc.gg`
  - (Add more as needed)

### 2. **Backend Admin Check (Secondary)**

- **Endpoint**: `POST /v1/admin/check-public`
- **Purpose**: Verifies admin status against backend database
- **Fallback**: If backend check fails, falls back to frontend check

### 3. **User Metadata Check**

- **Supabase User Metadata**: Checks for `role: 'admin'` or `is_admin: true`
- **Discord Integration**: Can be set through Discord OAuth metadata

## Admin Access Flow

1. **User Signs In**: Discord OAuth authentication
2. **Admin Check**: Frontend checks multiple sources for admin status
3. **UI Updates**: Admin link appears in header if user is admin
4. **Route Protection**: Admin routes are protected by `AdminRoute` component
5. **Backend Verification**: Admin API calls verify admin status on backend

## Adding New Admins

### Method 1: Update Frontend Code

```typescript
// In src/context/auth-context.tsx
const adminEmails = [
  'christian@bodegacatsgc.gg',
  'admin@bodegacatsgc.gg',
  'newadmin@example.com', // Add new admin email
];
```

### Method 2: Update Backend Code

```python
# In new-bodega-backend/app/routers/admin.py
admin_emails = [
    'christian@bodegacatsgc.gg',
    'admin@bodegacatsgc.gg',
    'newadmin@example.com', # Add new admin email
]
```

### Method 3: Supabase User Metadata

Set user metadata in Supabase:

```json
{
  "role": "admin",
  "is_admin": true
}
```

## Admin Features

Once authenticated as admin, users can access:

- **Admin Dashboard**: `/admin`
- **Player Stats Management**: `/admin/player-stats`
- **RP Updates**: Update player RP values
- **Badge Management**: Award and manage player badges
- **Event Management**: Create and manage tournaments
- **Team Management**: Manage team rosters and statistics

## Security Notes

- Admin status is checked on both frontend and backend
- Backend endpoints require admin authentication
- Admin routes are protected by `AdminRoute` component
- Failed admin checks redirect to login page
- Admin status is cached in auth context and refreshed on auth state changes
