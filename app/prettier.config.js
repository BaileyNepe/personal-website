/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  semi: false,
  lineWidth: 90,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/tailwind.css',
}
