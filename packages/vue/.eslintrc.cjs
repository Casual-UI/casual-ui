require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  overrides: [
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown',
    },
    {
      files: ['**/*.md/*.{js,ts,jsx,tsx,vue}'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-multi-spaces': 'error',
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        'no-trailing-spaces': ['error', { skipBlankLines: true }],
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: {
              max: 3,
            },
            multiline: {
              max: 1,
            },
          },
        ],
        'vue/html-indent': [
          'error',
          2,
          {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: true,
            ignores: [],
          },
        ],
      },
    },
  ],
  extends: [
    'eslint:recommended',
    'plugin:markdown/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
  ],
  plugins: ['vue', 'markdown', '@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    'vue/no-v-html': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'eol-last': 'off',
  },
}
