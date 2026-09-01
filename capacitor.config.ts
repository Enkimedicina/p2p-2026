import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nexus.p2pledger',
  appName: 'Nexus P2P Ledger',
  webDir: 'dist',
  android: {
    // Todo el contenido va empaquetado dentro del APK y los datos se guardan
    // en el dispositivo: la app funciona por completo sin conexión.
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
