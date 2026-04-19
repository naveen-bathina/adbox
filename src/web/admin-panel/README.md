# Admin Panel (React + TypeScript + Tailwind)

## Setup Steps

1. Initialize React project with Vite (recommended for speed)
2. Add Tailwind CSS and configure
3. Scaffold minimal login page (TDD: first test = renders login form)

## Example Directory Structure

src/web/admin-panel/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── tailwind.config.js
├── package.json
└── tsconfig.json

## Next Steps

- Run: npm create vite@latest admin-panel -- --template react-ts
- Install Tailwind: npm install -D tailwindcss postcss autoprefixer
- Configure Tailwind: npx tailwindcss init -p
- Add Tailwind to src/index.css
- Write first test: renders login form
