import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
  // allowedHosts: true lets the dev/preview servers accept requests through
  // a tunnel (cloudflared/ngrok) where the Host header is the public URL.
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        warehouse: 'warehouse.html',
        apparel: 'apparel.html',
        vegetables: 'vegetables.html',
        people: 'people.html',
      },
    },
  },
});
