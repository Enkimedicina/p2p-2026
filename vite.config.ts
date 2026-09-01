import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.GEMINI_API_KEY ?? env.API_KEY ?? '';

  return {
    plugins: [react()],
    // Rutas relativas: obligatorio para que la app funcione dentro del
    // WebView de Android (Capacitor sirve desde un origen local, no desde "/").
    base: './',
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
    },
    server: { port: 5173, host: true },
  };
});
