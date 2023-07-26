import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.biclaos.bicuat',
  appName: 'BIC UAT',
  bundledWebRuntime: false, // recently added
  webDir: 'www', // dist => change if www not working for wpa apps
  server: {
    androidScheme: 'https',
    allowNavigation: []
  }, 
  android: {
    allowMixedContent: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;