import js from '@eslint/js';
import globals from 'globals';

export default [
  // On récupère les règles recommandées par ESLint
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // Pour reconnaître 'process', 'module', etc.
        ...globals.mocha, // Si tu utilises Mocha (souvent utilisé par Codecept)
        inject: 'readonly', // Pour reconnaître l'injection CodeceptJS
        I: 'readonly',
        Given: 'readonly',
        When: 'readonly',
        Then: 'readonly',
        actor: 'readonly',
        orderApiPage: 'readonly'
      },
    },
    rules: {
      'indent': ['error', 2], // Indentation 2 espaces
      'no-multi-spaces': 'error', // Pas d'espaces multiples
      'no-trailing-spaces': 'error', // Pas d'espaces en fin de ligne
      'no-multiple-empty-lines': ['error', { 'max': 1 }], // Max 1 ligne vide
      'quotes': ['error', 'single'], // Simple quotes
      'semi': ['error', 'always'], // Point-virgule obligatoire
      'no-unused-vars': 'warn', // Alerte si une variable est inutilisée
      'no-undef': 'error' // Erreur si une variable n'est pas définie
    },
  },
];