import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  mode: 'jit',
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Inter", "Arial", "sans-serif"]
      },
      colors: {
        // dark
        d0: "#060606",
        d1: '#161616',
        d2: '#242424',
        // light
        l0: "#FFFFFF",
        l1: '#F4F4F4',
        l2: '#E6E6E6',
        // primary
        p: "#3B82F6",
        ph: "#3B82F660",
        // danger
        r: "#F43F5E",
        rh: "#F43F5E60",
        // pass
        c: "#10B981",
        ch: "#10B98160",
      },
    },
  },
  plugins: []
})
