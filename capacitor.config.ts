import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nexus.p2pledger',
  appName: 'Nexus P2P Ledger',
  webDir: 'dist',
  android: {
    // El contenido se sirve empaquetado dentro del APK: la app abre sin red.
    // Solo el módulo de IA (Gemini) necesita conexión.
    allowMixedContent: false,
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#020617',
      overlaysWebView: false,
    },
  },
};

export default config;
