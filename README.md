# Nuxt Passkeys Demo

A demonstration of passwordless authentication using WebAuthn passkeys in Nuxt 4, powered by [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils).

## Features

- 🔐 **Passwordless Authentication** - Sign in with passkeys (Face ID, Touch ID, Windows Hello, etc.)
- 🎨 **Beautiful UI** - Built with Nuxt UI components
- 💾 **SQLite Database** - Local database with Drizzle ORM
- 🔒 **Secure Sessions** - Encrypted cookie-based sessions
- 📱 **Cross-Device** - Passkeys can sync across your devices

## What are Passkeys?

Passkeys are a more secure and convenient alternative to passwords. They use public-key cryptography to authenticate you without transmitting any secrets over the network. Your private key never leaves your device, making phishing attacks nearly impossible.

## Tech Stack

- **Framework**: Nuxt 4
- **Authentication**: nuxt-auth-utils (WebAuthn/Passkeys)
- **Database**: SQLite with Drizzle ORM and libsql (Turso compatible)
- **UI**: Nuxt UI
- **Styling**: Tailwind CSS (via Nuxt UI)

## Prerequisites

- Node.js 18+
- A browser that supports WebAuthn (Chrome, Safari, Edge, Firefox)
- A device with biometric authentication or security key (optional but recommended)

## Setup

1. **Install dependencies**:

```bash
npm install
```

2. **Set up environment variables**:

Create a `.env` file in the root directory:

```bash
# Session password (at least 32 characters)
NUXT_SESSION_PASSWORD=your-super-secret-session-password-min-32-chars
```

> Note: If you don't set this, Nuxt Auth Utils will generate one for you during development.

3. **Generate and run database migrations**:

```bash
npm run db:generate  # Generate migration files
```

The migrations will run automatically when you start the dev server.

4. **Start the development server**:

```bash
npm run dev
```

5. **Open your browser**:

Navigate to [http://localhost:3000](http://localhost:3000)

## How It Works

### Registration Flow

1. User enters their email and name
2. Browser prompts for biometric authentication (Face ID, Touch ID, etc.)
3. A passkey is created and stored on the device
4. User credentials are saved to the database
5. User is automatically logged in

### Authentication Flow

1. User clicks "Sign In with Passkey"
2. Browser prompts to select a passkey
3. User authenticates with biometrics
4. User is logged in without any password

### Database Schema

**Users Table**:

- `id` - Auto-incrementing primary key
- `email` - Unique email address
- `name` - User's display name
- `createdAt` - Timestamp

**Authenticators Table**:

- `id` - Auto-incrementing primary key
- `userId` - Foreign key to users table
- `credentialID` - Unique WebAuthn credential ID
- `credentialPublicKey` - Public key for verification (base64)
- `counter` - Counter for replay attack prevention
- `credentialBackedUp` - Backup eligibility flag
- `transports` - Supported transports (USB, NFC, BLE, internal)
- `createdAt` - Timestamp

## Project Structure

```
nuxt-passkeys/
├── app/
│   └── app.vue                    # Main app wrapper
├── components/
│   ├── PasskeyAuth.vue           # Authentication UI component
│   └── UserDisplay.vue           # Logged-in user display
├── pages/
│   └── index.vue                 # Home page
├── server/
│   ├── api/
│   │   └── auth/
│   │       ├── webauthn/
│   │       │   ├── register.post.ts    # Passkey registration endpoint
│   │       │   └── authenticate.post.ts # Passkey authentication endpoint
│   │       └── logout.post.ts          # Logout endpoint
│   ├── database/
│   │   ├── schema.ts             # Drizzle schema
│   │   ├── index.ts              # Database connection
│   │   └── migrations/           # Auto-generated migrations
│   ├── plugins/
│   │   └── migrations.ts         # Auto-run migrations on dev
│   ├── types/
│   │   └── auth.d.ts            # TypeScript types for sessions
│   └── utils/
│       └── migrate.ts            # Migration utility
├── drizzle.config.ts             # Drizzle configuration
└── nuxt.config.ts                # Nuxt configuration
```

## API Endpoints

### POST `/api/auth/webauthn/register`

Registers a new passkey for a user.

**Body**:

```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

### POST `/api/auth/webauthn/authenticate`

Authenticates a user with their passkey.

**Body**: None (WebAuthn handles credential selection)

### POST `/api/auth/logout`

Logs out the current user.

## Database Scripts

```bash
# Generate new migration files
npm run db:generate

# Run migrations (happens automatically in dev)
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio
```

## Development Tips

### Testing Passkeys

1. **Desktop**: Use Touch ID (Mac), Windows Hello, or a security key
2. **Mobile**: Use Face ID or fingerprint sensor
3. **Testing**: Each device will have its own passkey - they can sync via iCloud/Google Password Manager

### Debugging

- Check browser console for WebAuthn errors
- Use Drizzle Studio (`npm run db:studio`) to inspect the database
- Session data is encrypted in cookies - use the session API to debug

### Common Issues

**"Passkey not found"**: Make sure you're using the same device/browser where you registered

**"User verification failed"**: Check that your biometric sensor is working

**"Invalid domain"**: Passkeys are domain-specific; localhost and production are different domains

## Security Considerations

- Passkeys are stored **only on the user's device** (or synced via platform keychain)
- Session data is **encrypted** in HTTP-only cookies
- No passwords are **ever stored or transmitted**
- Counter mechanism **prevents replay attacks**
- WebAuthn **prevents phishing** by validating domain origin

## Production Deployment

### Option 1: Using Turso (Recommended for SQLite)

1. Create a Turso database:

```bash
turso db create nuxt-passkeys
turso db show nuxt-passkeys
```

2. Set environment variables:

```bash
DATABASE_URL=libsql://your-database.turso.io
DATABASE_AUTH_TOKEN=your-auth-token
NUXT_WEBAUTHN_ORIGIN=https://your-domain.com
NUXT_SESSION_PASSWORD=your-secure-password-min-32-chars
```

3. Update `server/database/index.ts` to use auth token:

```typescript
const client = createClient({
  url: process.env.DATABASE_URL || "file:.data/db.sqlite",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
```

### Option 2: Other Databases

1. Switch to PostgreSQL, MySQL, etc. by updating the Drizzle configuration

2. Set the `NUXT_WEBAUTHN_ORIGIN` environment variable to your production URL

3. Set a strong `NUXT_SESSION_PASSWORD` (minimum 32 characters)

4. Deploy to a platform that supports Node.js (Netlify, Vercel, DigitalOcean, etc.)

## Learn More

- [WebAuthn Guide](https://webauthn.guide/)
- [Nuxt Auth Utils Docs](https://github.com/atinux/nuxt-auth-utils)
- [Passkeys.dev](https://passkeys.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Nuxt UI](https://ui.nuxt.com/)

## License

MIT

---

Built with ❤️ using Nuxt 4, Drizzle ORM, and Nuxt UI
