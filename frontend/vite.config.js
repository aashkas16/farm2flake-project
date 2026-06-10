import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to resolve es-toolkit/compat/ imports to ESM equivalents,
// resolving require_isUnsafeProperty naming collisions during dependency pre-bundling.
const esToolkitCompatPlugin = () => ({
  name: 'es-toolkit-compat-bridge',
  resolveId(id) {
    const match = id.match(/es-toolkit[/\\]compat[/\\]([^./\\\?]+)/);
    if (match) {
      return '\0es-toolkit/compat/' + match[1];
    }
    return null;
  },
  load(id) {
    if (id.startsWith('\0es-toolkit/compat/')) {
      const name = id.replace('\0es-toolkit/compat/', '');
      return `
        import { ${name} } from 'es-toolkit/dist/compat/index.mjs';
        export default ${name};
      `;
    }
    return null;
  }
});

export default defineConfig({
  plugins: [
    react(),
    esToolkitCompatPlugin()
  ],
  optimizeDeps: {
    exclude: ['recharts', 'es-toolkit']
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://farm2flake-backend.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
