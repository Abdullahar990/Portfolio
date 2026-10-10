import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'test-results/**', 'playwright-report/**'] },
  ...nextVitals,
  ...nextTypeScript,
  prettier,
];

export default eslintConfig;
