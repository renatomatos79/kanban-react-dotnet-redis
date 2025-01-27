import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        include: ['src/**/*.test.tsx'],
        globals: true,
        environment: 'jsdom',
        setupFiles: './setup.ts',
        coverage: {
            provider: 'v8',
            include: ['src/**/*.tsx'],
            exclude: ['src/**/*.test.tsx', 'src/types', 'src/configs', 'src/constants'],
            reporter: ['text', 'html'],
        },
    },
  })