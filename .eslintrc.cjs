/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: [
    '@antfu',
    './.eslintrc-auto-import.json',
    '@unocss',
    'prettier', // 确保 ESLint 与 Prettier 规则兼容
  ],
  plugins: [
    'prettier', // 启用 eslint-plugin-prettier
  ],
  rules: {
    'prettier/prettier': 'error', // 将 Prettier 问题报告为 ESLint 错误
    curly: ['error', 'all'],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/no-use-before-define': ['error', { allowNamedExports: true, functions: false }],
    'vue/no-empty-component-block': ['error'],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@vueuse/core',
            importNames: ['useClipboard'],
            message: 'Please use local useCopy from src/composable/copy.ts instead of useClipboard.',
          },
        ],
      },
    ],
    // 确保与 Prettier 兼容的规则
    'vue/max-attributes-per-line': 'off', // 交给 Prettier 处理
    'vue/html-self-closing': 'off', // 交给 Prettier 处理
    'vue/html-indent': 'off', // 交给 Prettier 处理
    'vue/multiline-html-element-content-newline': 'off', // 交给 Prettier 处理
    'vue/singleline-html-element-content-newline': 'off', // 交给 Prettier 处理
  },
};
