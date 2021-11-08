const envPath = `.env.${process.env.ENV || "prod"}`;
require("dotenv").config({ path: envPath });

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-cognito-sample",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  mode: "universal",

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/dotenv"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next"
  ],

  router: {
    middleware: ["auth"]
  },

  auth: {
    redirect: {
      login: "/",
      logout: "/",
      callback: "/callback",
      home: "/menu"
    },
    strategies: {
      cognito: {
        scheme: "@a1ter/nuxt-auth-aws-cognito-scheme/scheme/scheme",
        credentials: {
          region: process.env.COGNITO_REGION,
          userPoolId: process.env.COGNITO_USER_POOL_ID,
          userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
        },
        endpoints: {
          user: false
        }
      }
    }
  },

  dotenv: {
    filename: envPath
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["@nuxtjs/auth-next"]
  }
};
