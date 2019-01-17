import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
import gzipPlugin from 'rollup-plugin-gzip'

export default [
  {
    input: 'src/index.js',
    output: [
      { name: 'concave', file: pkg.browser, format: 'umd' },
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' }
    ],
    plugins: [
      terser(),
      gzipPlugin()
    ]
  }
]
