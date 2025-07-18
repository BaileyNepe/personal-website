/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  semi: false,
  printWidth: 90,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
}
