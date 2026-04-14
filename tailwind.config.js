/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './blog/**/*.{md,mdx}',
    './developers/**/*.{md,mdx}',
    './playbook/**/*.{md,mdx}',
    './papers/**/*.{md,mdx}',
    './apple-and-weaviate/**/*.{md,mdx}',
    './iosappsandvectordatabases/**/*.{md,mdx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
