module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
    },
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["24px", "35px"],
      xl: ["35px", "42px"],
    },
    // fontWeight: {
    //   // bold: ["20px", "20px"],
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
