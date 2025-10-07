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

## Database Scripts

```bash
# Generate new migration files
npm run db:generate

# Run migrations (happens automatically in dev)
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio
```

```

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
```
