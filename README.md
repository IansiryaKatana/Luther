# Luther | International Marketing Agency Dubai

Premier international marketing agency in Dubai specializing in branding, social media strategy, web development, and creative marketing solutions.

## Developed By
Developed by ian katana [Iankatana.com](https://iankatana.com)

## Technologies Used
- **Frontend**: React, Vite, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **Backend/Database**: Supabase
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation
1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your environment variables in a `.env` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

### Development
Start the development server:
```sh
npm run dev
```

### Building for Production
Build the project:
```sh
npm run build
```

### Deploying to Netlify
1. Connect this repo to [Netlify](https://netlify.com)
2. Build settings are pre-configured via `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Add environment variables in Netlify (Site settings → Environment variables):
   - `VITE_SUPABASE_URL` – your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` – your Supabase anon/public key
4. SPA routing is configured so all routes serve `index.html` (client-side routing)

## Project Structure
- `src/components`: Reusable UI components and page sections
- `src/hooks`: Custom React hooks for data fetching and logic
- `src/pages`: Main page components and routing
- `src/integrations/supabase`: Supabase client configuration
- `supabase/migrations`: Database schema migrations

---
Developed by ian katana link [Iankatana.com](https://iankatana.com)
