import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    formatters: true,
    vue: {
      overrides: {
        'vue/no-multiple-template-root': 'off',
        'vue/block-lang': [
          'error',
          {
            script: {
              lang: 'ts',
            },
            style: {
              lang: 'scss',
            },
          },
        ],
        'vue/define-macros-order': ['error', { order: ['definePage', 'defineModel', 'defineCustom', 'defineEmits', 'defineSlots'], defineExposeLast: true }],
        'vue/enforce-style-attribute': ['error', {
          allow: ['scoped'],
        }],
      },
    },
    rules: {
      'no-console': 'warn',
      'no-alert': 'warn',
      'unicorn/filename-case': ['error', {
        case: 'kebabCase',
        ignore: [/\.vue$/, /\.md$/],
      }],
    },
  }),
)
