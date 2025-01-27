import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        include: ['src/**/*.test.tsx'],
        globals: true,
        environment: 'jsdom',
        setupFiles: './setup.ts'
    },
  })