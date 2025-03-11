import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // Vuetify integration
  ],
  base: process.env.NODE_ENV === 'production' ? '/task.sketchmonk.com/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0]; // Split libraries by their names
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000,  // You can increase this to suppress the warning
  },
});
