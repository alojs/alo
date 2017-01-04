import flow from 'rollup-plugin-flow'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'main/alo.full.js',
  dest: 'dist/alo.full.js',
  format: 'umd',
  moduleId: 'alo',
  moduleName: 'Alo',
  sourceMap: 'true',
  plugins: [ flow(), nodeResolve({ jsnext: true, main: true }), commonjs(), buble() ]
}
