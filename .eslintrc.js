module.exports = {
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'prettier',
    'typescript-sort-keys',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:typescript-sort-keys/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: {
          memberTypes: [
            // Index signature
            'signature',
            'call-signature',

            // Fields
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            '#private-static-field',

            'public-decorated-field',
            'protected-decorated-field',
            'private-decorated-field',

            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            '#private-instance-field',

            'public-abstract-field',
            'protected-abstract-field',

            'public-field',
            'protected-field',
            'private-field',
            '#private-field',

            'static-field',
            'instance-field',
            'abstract-field',

            'decorated-field',

            'field',

            // Static initialization
            'static-initialization',

            // Constructors
            'public-constructor',
            'protected-constructor',
            'private-constructor',

            'constructor',

            // Getters
            'public-static-get',
            'protected-static-get',
            'private-static-get',
            '#private-static-get',

            'public-decorated-get',
            'protected-decorated-get',
            'private-decorated-get',

            'public-instance-get',
            'protected-instance-get',
            'private-instance-get',
            '#private-instance-get',

            'public-abstract-get',
            'protected-abstract-get',

            'public-get',
            'protected-get',
            'private-get',
            '#private-get',

            'static-get',
            'instance-get',
            'abstract-get',

            'decorated-get',

            'get',

            // Setters
            'public-static-set',
            'protected-static-set',
            'private-static-set',
            '#private-static-set',

            'public-decorated-set',
            'protected-decorated-set',
            'private-decorated-set',

            'public-instance-set',
            'protected-instance-set',
            'private-instance-set',
            '#private-instance-set',

            'public-abstract-set',
            'protected-abstract-set',

            'public-set',
            'protected-set',
            'private-set',
            '#private-set',

            'static-set',
            'instance-set',
            'abstract-set',

            'decorated-set',

            'set',

            // Methods
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            '#private-static-method',

            'public-decorated-method',
            'protected-decorated-method',
            'private-decorated-method',

            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
            '#private-instance-method',

            'public-abstract-method',
            'protected-abstract-method',

            'public-method',
            'protected-method',
            'private-method',
            '#private-method',

            'static-method',
            'instance-method',
            'abstract-method',

            'decorated-method',

            'method',
          ],
          order: 'alphabetically',
        },
      },
    ],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/newline-after-import': ['error'],
  },
};
