// vite.config.js
import { defineConfig } from "file:///home/brousse/workspace/VueJS/Tickets/frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///home/brousse/workspace/VueJS/Tickets/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue()
    ],
    server: {
      port: 8e3,
      open: true,
      proxy: {
        "^/api/.*": {
          target: "http://localhost:3000",
          ws: true,
          secure: false,
          changeOrigin: true
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9icm91c3NlL3dvcmtzcGFjZS9WdWVKUy9UaWNrZXRzL2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9icm91c3NlL3dvcmtzcGFjZS9WdWVKUy9UaWNrZXRzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2Jyb3Vzc2Uvd29ya3NwYWNlL1Z1ZUpTL1RpY2tldHMvZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgIHJldHVybiB7XG4gICAgICBwbHVnaW5zOiBbXG4gICAgICAgICB2dWUoKSxcbiAgICAgIF0sXG4gICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgIHBvcnQ6IDgwMDAsXG4gICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgICdeL2FwaS8uKic6IHtcbiAgICAgICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgICAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFxuICAgfVxufSlcblxuXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQVMsb0JBQW9CO0FBQ3pWLE9BQU8sU0FBUztBQUVoQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNO0FBQ2hELFNBQU87QUFBQSxJQUNKLFNBQVM7QUFBQSxNQUNOLElBQUk7QUFBQSxJQUNQO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDSixZQUFZO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixJQUFJO0FBQUEsVUFDSixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsUUFDakI7QUFBQSxNQUNIO0FBQUEsSUFDSDtBQUFBLEVBRUg7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
