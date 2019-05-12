import pkg from './package.json'
import filesize from 'rollup-plugin-filesize'

export default [
  {
    input: 'src/index.js',
    output: [
      { name: 'concave', file: pkg.unpkg, format: 'umd' },
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' }
    ],
    plugins: [
      filesize()
    ]
  }
]
