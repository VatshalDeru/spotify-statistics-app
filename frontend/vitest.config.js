
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
            // These reduce noise without silencing your logs:
    logHeapUsage: false,
    passWithNoTests: true,
    // Optional: Only show failing tests in output
    reporters: ['default', 'verbose'] // or 'dot' for minimal output
    }
})