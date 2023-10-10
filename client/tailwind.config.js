/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        Xmd: "870px",
        Xemd: "845px",
        Xxmd: "787px",
        Xsm: "450px",
        "2Xsm": "380px",
        mdC: "500px",
        Xsmd: "633px",
        FS: "100%",
      },
      fontFamily: {
        'body': ['Poppins', "sans-serif"],
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fit, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [],
});
