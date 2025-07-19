
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        logHeapUsage: false,
        passWithNoTests: true,
        coverage: {
            reporter: ['text', 'html'] // 'text' for console coverage report, 'lcov' for HTML report
        }
    }
})