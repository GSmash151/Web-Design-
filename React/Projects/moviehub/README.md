# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
___

## Steps to start the project
- Install Vite: 
```bash
npm create vite@latest
```

- Install Tailwindcss
```bash
npm install -D tailwindcss postcss autoprefixer
npm install tailwindcss @tailwindcss/vite
```

TroublingShoot: 
```bash
touch tailwind.config.js postcss.config.js
```

-In tailwind.config.js
```js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,tsx}'
    ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

- In postcss.config.js 
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

[] Rename:
```arduino
postcss.config.js → postcss.config.cjs
```
Run
```bash
npx tailwindcss init -p
```

Run
```bash
npm run dev
```

- In index.css add
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
and clear out the the rest of the code, delete App.css

- Edit App.tsx clear out the rest
```tsx
function App() {  
  return (
    <>
     <h1 className="text-red-500">Welcome</h1>
    </>
  )
}

export default App
```

- Go to (https://ui.shadcn.com/docs/installation/vite) and edit tsconfig.json 
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```
Update vite.config.ts
Add the following code to the vite.config.ts so your app can resolve paths without error:

vite.config.ts
```ts
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

```bash
npm install -D @types/node
```

`Run the CLI`
- Run the shadcn init command to setup your project:
```bash
npx shadcn@latest init
```
- Result
```bash
npx shadcn@latest init
Need to install the following packages:
shadcn@2.7.0
Ok to proceed? (y) y

npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
✔ Preflight checks.
✔ Verifying framework. Found Vite.
✔ Validating Tailwind CSS.
✔ Validating import alias.
√ Which style would you like to use? » Default
√ Which color would you like to use as the base color? » Slate
✔ Writing components.json.
✔ Checking registry.
✔ Updating tailwind.config.js
✔ Updating CSS variables in src\index.css
✔ Installing dependencies.
✔ Created 1 file:
  - src\lib\utils.ts

Success! Project initialization completed.
You may now add components.
```
`Add Components`
- You can now start adding components to your project.
```bash 
npx shadcn@latest add button
```

- Install React Router (https://reactrouter.com/start/declarative/installation)
```bash
npm install react-router@6 react-router-dom@6
or
npm i react-router
```

- Build `Navbar.tsx` in src/components/ui/
after add the logo to assets/image, start building the search bar then go to (https://ui.shadcn.com/docs/components/input)
```bash
npx shadcn@latest add input
```
Fix the function in /src/components/input.tsx
```tsx
import * as React from "react"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  // Here
  ({ className, type, ...props }, ref) => {
    function cn(...classes: (string | undefined | false | null)[]): string {
      return classes.filter(Boolean).join(" ");
    }
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

- Edit main.tsx file
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> <--- Here
     <App />
    </BrowserRouter>
  </StrictMode>,
)

```

/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

and at the bottom:
```tsx
@layer base {
  * {
    @apply border-border;
    font-family: "Montserrat", sans-serif;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Create src/routes/AllRoutes.tsx
```tsx
// Imports: 
import { Route, Routes } from "react-router";
import MovieList from "../components/ui/MovieList";
import TvShowList from "../components/ui/TvShowList";

const AllRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element /> */}
        <Route path="/movies" element={<MovieList />} /> <--- Movie List
        <Route path="/tvshows" element={<TvShowList />} /> <--- Tv Show List
    </Routes>
  );
}

export default AllRoutes
```

- create a src/components/ui/MovieList.tsx
- create a src/components/ui/TvMovieList.tsx

#### create a src/hooks/useMovies.ts
```ts
// src/hooks/useMovies.ts
// Description: Custom hook to fetch a list of movies from an API.

// Import:

import apiClients from "../services/api-clients"

const useMovieList = () => {
    const fetchMovieList = async () => {
        try {
            await apiClients.get('discover/movie');
        } catch (error) {

        }
    };

    return { fetchMovieList };
}

export default useMovieList;
```

### Get the API Key from (https://www.themoviedb.org/settings/api)then go to (https://developer.themoviedb.org/reference/)

- Install Axios for HTTP client (https://www.npmjs.com/package/axios)
```bash
npm i axios
```

- Create a .env file to store the api key 
#### Create a src/services/api.clients.ts file to pass the api_key
```ts
import axios from 'axios';

export default axios.create({
    baseURL:'https://api.themoviedb.org/3',
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
})
```
After editing `useMovies.ts` file create a `src/components/ui/MovieCard.tsx` file 
- Install Card from (https://ui.shadcn.com/docs/components/card)
```bash
npx shadcn@latest add card
```
After creating the movie list and tv show list go to genres list
--- 

#### Create src/components/ui/Genres.tsx file
- Install DropDownMenu from (https://ui.shadcn.com/docs/components/dropdown-menu)
```bash
npx shadcn@latest add dropdown-menu
```

- Create a src/context folder then src/context/genres.context.tsx