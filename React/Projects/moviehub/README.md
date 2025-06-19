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


