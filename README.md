# Private Notes Vault 🔒

A secure, minimal personal notes application built with React, Vite, and Supabase.

## 🎯 Features

- **Secure Authentication**: Email/Password + Google OAuth
- **Private Notes**: Create, view, edit, and delete personal notes
- **Row Level Security**: Database-enforced privacy (users can NEVER access other users' notes)
- **Minimal Design**: Clean, distraction-free UI with Tailwind CSS
- **Protected Routes**: Authentication-gated pages

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Routing**: React Router v6
- **Security**: Row Level Security (RLS) policies

## 📋 Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)

## 🚀 Setup Instructions

### 1. Clone and Install

```bash
cd PrivateNotes
npm install
```

### 2. Supabase Setup

#### A. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database provisioning

#### B. Run Database Migration
1. Go to **SQL Editor** in Supabase Dashboard
2. Copy contents of `supabase-schema.sql`
3. Execute the SQL to create tables and RLS policies

#### C. Configure Google OAuth (Optional)
1. Go to **Authentication** > **Providers** in Supabase
2. Enable **Google** provider
3. Follow Supabase's guide to configure OAuth

### 3. Environment Variables

Create `.env` file in the root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these:**
- Supabase Dashboard → **Settings** → **API**
- Copy **Project URL** and **anon public** key

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation bar with logout
│   ├── NoteCard.jsx         # Note preview card
│   └── ProtectedRoute.jsx   # Auth guard for private routes
├── contexts/
│   └── AuthContext.jsx      # Authentication state management
├── lib/
│   └── supabase.js          # Supabase client configuration
├── pages/
│   ├── Login.jsx            # Login page (Email + Google)
│   ├── Signup.jsx           # Registration page
│   ├── Dashboard.jsx        # Notes list + create modal
│   └── ViewNote.jsx         # View/edit single note
├── services/
│   └── notesService.js      # CRUD operations for notes
├── App.jsx                  # Main app with routing
└── main.jsx                 # Entry point

supabase-schema.sql          # Database schema + RLS policies
```

## 🔐 Security Architecture

### Row Level Security (RLS)

All data access is controlled at the **database level**:

```sql
-- Users can only SELECT their own notes
CREATE POLICY "Users can view their own notes only"
  ON notes FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only INSERT notes for themselves
CREATE POLICY "Users can create notes for themselves only"
  ON notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Similar policies for UPDATE and DELETE
```

### Key Security Features

1. **Database-Enforced Privacy**: Even if frontend is compromised, users cannot access other users' data
2. **Secure Auth Flow**: Managed by Supabase Auth
3. **Protected Routes**: Unauthenticated users redirected to login
4. **Safe API Key**: The `anon` key is safe to expose (protected by RLS)

⚠️ **Never commit** your `.env` file or `service_role` key!

## 📱 User Flow

1. **Sign Up** → Create account with email/password or Google
2. **Login** → Authenticate and redirect to dashboard
3. **Dashboard** → View all notes, create new notes
4. **View Note** → Click note to view full content
5. **Edit Note** → Click "Edit" to modify title/content
6. **Delete Note** → Remove note with confirmation
7. **Logout** → Sign out and return to login

## 🧪 Testing Security

### Test 1: Verify RLS Protection
1. Create Account A and add notes
2. Create Account B in incognito window
3. Try to manually query Account A's notes using Account B's session
4. ✅ Should return empty (RLS blocks access)

### Test 2: Direct Database Access
1. Use Supabase Table Editor
2. Try to view notes without auth
3. ✅ Should see all notes (you're using service role)
4. Frontend users never have service role access

### Test 3: Cross-User Access
1. Get a note ID from User A
2. Log in as User B
3. Navigate to `/note/<user-a-note-id>`
4. ✅ Should redirect to dashboard (note not found for User B)

## 🎨 Design Philosophy

- **Minimal**: No unnecessary features
- **Calm**: Neutral color palette
- **Private**: Security by default
- **Focused**: Pure note-taking experience

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Ensure `.env` file exists with correct variables
- Restart dev server after creating `.env`

### Google OAuth not working
- Enable Google provider in Supabase Dashboard
- Configure OAuth credentials properly
- Check redirect URLs match

### Notes not loading
- Verify database migration ran successfully
- Check browser console for errors
- Ensure RLS policies are applied

### Can't create notes
- Check if user is authenticated
- Verify `user_id` is being set correctly
- Review Supabase logs for errors

## 📦 Building for Production

```bash
npm run build
```

Deploy the `dist/` folder to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static host

**Remember**: Configure environment variables in your hosting platform!

## 🔧 Configuration

### Supabase Client
See [src/lib/supabase.js](src/lib/supabase.js) for client configuration.

### Tailwind CSS
Customize theme in [tailwind.config.js](tailwind.config.js).

### Routes
Modify routes in [src/App.jsx](src/App.jsx).

## 📄 License

MIT License - Feel free to use this project as you wish.

## 🤝 Contributing

This is a learning project focused on security and simplicity. Feel free to fork and modify!

---

**Built with security in mind. Your notes are truly private.** 🔒
