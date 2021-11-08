module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/forms"),
    function({ addComponents }) {
      addComponents({
        // 共通 containerクラス
        ".container": {
          maxWidth: "100%",
          // スマホ表示時の最大width
          "@screen sm": {
            maxWidth: "640px"
          },
          // タブレット表示時の最大width
          "@screen md": {
            maxWidth: "768px"
          },
          // PC表示時の最大width
          "@screen lg": {
            maxWidth: "1196px"
          }
        }
      });
    }
  ],
  mode: "jit"
};
