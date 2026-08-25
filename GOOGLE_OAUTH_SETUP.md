# Google OAuth Setup Guide for Expert Authentication

## Issues Fixed

### 1. Parameter Mismatch
- **Fixed**: Backend now accepts both `state` and `role` parameters
- **Fixed**: Frontend sends both parameters for compatibility

### 2. Enhanced Error Handling
- **Added**: Detailed error logging in callback handler
- **Added**: Specific error messages for different failure types
- **Added**: Debug endpoint at `/api/auth/debug/oauth-config`

### 3. Better Console Logging
- **Added**: Comprehensive logging throughout the auth flow
- **Added**: Google token verification logging
- **Added**: User creation and account linking logs

## Google Cloud Console Setup Required

### Step 1: Create OAuth 2.0 Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth 2.0 Client IDs**

### Step 2: Configure OAuth Client
**Application Type**: Web application

**Authorized JavaScript origins**:
```
http://localhost:3000
https://cytoplast-robin-hasty.ngrok-free.dev
```

**Authorized redirect URIs**:
```
http://localhost:3000/auth/google/callback
https://cytoplast-robin-hasty.ngrok-free.dev/auth/google/callback
```

### Step 3: Environment Variables
Ensure these are set in your backend `.ENV`:

```bash
GOOGLE_CLIENT_ID=1032037390740-193fme5dl3u4jh3uq33bc1mh4rejuihh.apps.googleusercontent.com
FRONTEND_URL=https://cytoplast-robin-hasty.ngrok-free.dev
APP_URL=https://cytoplast-robin-hasty.ngrok-free.dev
```

And in your frontend `web/.env`:
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=1032037390740-193fme5dl3u4jh3uq33bc1mh4rejuihh.apps.googleusercontent.com
```

## Testing the Fix

### 1. Check Configuration
Visit: `https://your-backend-url/api/auth/debug/oauth-config`

This should return:
```json
{
  "success": true,
  "data": {
    "googleClientIdConfigured": true,
    "googleClientIdPrefix": "1032037390740-193fme5...",
    "frontendUrl": "https://cytoplast-robin-hasty.ngrok-free.dev",
    "appUrl": "https://cytoplast-robin-hasty.ngrok-free.dev"
  }
}
```

### 2. Test Expert Google Sign In
1. Go to `/expert/signup` or `/login?role=expert`
2. Click "Continue with Google"
3. Check browser console for detailed logs
4. Check backend logs for authentication flow

### 3. Debug Common Issues

**Error: "Google Sign-In is not configured"**
- Check `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in frontend environment

**Error: "Google authentication failed: Invalid Google token"**
- Verify Google Client ID matches in both frontend and backend
- Check if redirect URI is authorized in Google Console

**Error: "No ID token in callback"**
- Check if authorized redirect URIs include your current domain
- Verify the callback URL construction matches exactly

**Error: OAuth callback shows access_denied**
- User canceled authentication
- Check if your domain is authorized in Google Console

## Flow Overview

1. **Expert clicks Google sign in** → Redirects to Google OAuth
2. **Google redirects back** → `/auth/google/callback` with ID token in URL hash
3. **Callback extracts token** → Calls `/api/auth/google` with `state=expert`
4. **Backend verifies token** → Creates/finds practitioner account
5. **Returns JWT tokens** → Frontend stores and redirects to expert dashboard

## Key Files Modified

1. `backend/src/routes/auth.ts` - Enhanced Google auth endpoint
2. `web/src/app/auth/google/callback/page.tsx` - Improved callback handler
3. `web/src/app/expert/signup/page.tsx` - Better error handling
4. `web/src/app/login/page.tsx` - Error display from OAuth failures
5. `web/src/lib/api.ts` - API client sends both state and role

## Next Steps

1. **Update Google Cloud Console** with correct redirect URIs
2. **Test the authentication flow** with console logging
3. **Monitor backend logs** for any remaining issues
4. **Verify expert dashboard access** after successful authentication