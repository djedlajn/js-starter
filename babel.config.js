const isTest = String(process.env.NODE_ENV) === 'test'
module.exports = function(api) {
  api.cache(true)

  const presets = [
    ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
    '@babel/preset-react',
  ]
  const plugins = []

  return {
    presets,
    plugins,
  }
}
