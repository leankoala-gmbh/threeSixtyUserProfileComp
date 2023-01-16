import 'tailwindcss/tailwind.css'
import '../src/assets/index.css'
import '../src/assets/colors.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
