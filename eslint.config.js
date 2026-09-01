import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '19.2' } },
    plugins: { react, 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react/no-unknown-property': ['error', {
        ignore: ['position', 'rotation', 'object', 'geometry', 'material', 'skeleton',
                 'dispose', 'intensity', 'args', 'morphTargetDictionary', 'morphTargetInfluences',
                 'skyColor', 'groundColor', 'transparent', 'side']
      }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  // Vitest test files and setup
  {
    files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}', '**/tests/**/*.{js,jsx}', 'src/test/setup.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
  },
  // Node globals for config files
  {
    files: ['vite.config.{js,ts}', 'vitest.config.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]
