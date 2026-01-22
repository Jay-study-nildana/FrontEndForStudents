# Tail Wind V4 setup

The way tailwind gets configured with v4 has changed. At the point of typing, even the AI is unable to explain this properly. So, use the information below to get it up and running.

```
npm create vite@latest react-tw-hw3 -- --template react
npm install tailwindcss @tailwindcss/vite
```

Add the @tailwindcss/vite plugin to your Vite configuration.

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
})
```

index.css

```
@import "tailwindcss";
```

note: once everything is up and running, you may want to check the .css files of the current, starter project to make sure everything is working as expecgted. 