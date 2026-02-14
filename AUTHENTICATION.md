# Authentication System - Static Data

## Overview
Your admin panel now has a complete authentication system using **static/hardcoded credentials** (no backend required).

## How It Works

### 1. **Login Flow**
- User visits `/admin` → automatically redirects to `/admin/login`
- User enters credentials on the login page
- Credentials are checked against hardcoded values
- On success: token and user data stored in localStorage → redirect to `/admin/dashboard`
- On failure: error message displayed

### 2. **Protected Routes**
- All admin routes (except `/admin/login` and `/admin`) are protected by `AuthGuard`
- `AuthGuard` checks for `authToken` and `user` in localStorage
- If not authenticated → redirect to `/admin/login`
- If authenticated → show the requested page

### 3. **Demo Credentials**
```
Email: admin@nextstep.edu
Password: admin123
```

## Files Modified/Created

### Created Files:
1. **`app/components/admin/auth/AuthGuard.tsx`**
   - Protects admin routes
   - Checks authentication status
   - Redirects to login if not authenticated

2. **`app/components/admin/auth/LoginForm.tsx`**
   - Login UI with form
   - Static credential validation
   - Shows demo credentials
   - Handles login logic

3. **`app/lib/auth.ts`**
   - Utility functions: `logout()`, `isAuthenticated()`, `getCurrentUser()`

### Modified Files:
1. **`app/admin/layout.tsx`**
   - Wrapped with `AuthGuard` (except login page)
   - Converted to client component

2. **`app/admin/page.tsx`**
   - Redirects `/admin` to `/admin/login`

3. **`app/admin/login/page.tsx`**
   - Uses `LoginForm` component

## Usage

### To Test:
1. Visit `http://localhost:3000/admin`
2. You'll be redirected to `/admin/login`
3. Enter the demo credentials
4. You'll be logged in and redirected to `/admin/dashboard`

### To Add Logout Button:
In any component (like Header), import and use:
```tsx
import { logout } from '@/app/lib/auth';

<button onClick={logout}>Logout</button>
```

### To Get Current User:
```tsx
import { getCurrentUser } from '@/app/lib/auth';

const user = getCurrentUser();
console.log(user.name); // "Admin User"
```

## Future: Connecting to Backend

When you're ready to connect to a real backend, simply update `LoginForm.tsx`:

```tsx
// Replace the static check with API call
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

const data = await response.json();
localStorage.setItem('authToken', data.token);
localStorage.setItem('user', JSON.stringify(data.user));
```

## Security Note
⚠️ This is for **development/demo purposes only**. In production:
- Never hardcode credentials in frontend code
- Use secure backend authentication
- Use HTTP-only cookies instead of localStorage
- Implement proper JWT validation
