// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: "https://matta.trade",
  },
  nitro: {
    baseURL: "/",
    prerender: {
      crawlLinks: true,
      // failOnError: false,
    },
  },
  image: {
    inject: true,
    cloudinary: {
      baseURL: "https://res.cloudinary.com/arudovwen-me/image/upload/",
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@vee-validate/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "nuxt-vue3-google-signin",
    "nuxt-simple-sitemap",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-swiper",
    "@nuxt/image",
    "nuxt-security",
    "@nuxt/devtools",
    "nuxt-ssr-cache",
  ],
  security: {
    hidePoweredBy: false,
    headers: {
      crossOriginEmbedderPolicy: "unsafe-none",
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "https:",
          "data:",
          "https://gateway.matta.trade",
          "https://res.cloudinary.com",
        ],
        "script-src": [
          "'self'",
          "https:",
          "'unsafe-inline'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
        ],
      },
      xFrameOptions: "deny",
    },
  },
  cache: {
    // if you're serving multiple host names (with differing
    // results) from the same server, set this option to true.
    // (cache keys will be prefixed by your host name)
    // if your server is behind a reverse-proxy, please use
    // express or whatever else that uses 'X-Forwarded-Host'
    // header field to provide req.hostname (actual host name)
    useHostPrefix: false,
    pages: [
      // these are prefixes of pages that need to be cached
      // if you want to cache all pages, just include '/'
      "/",
    ],

    // key(route, context) {
    //   // custom function to return cache key, when used previous
    //   // properties (useHostPrefix, pages) are ignored. return
    //   // falsy value to bypass the cache
    // },

    store: {
      type: "memory",
      max: 100,
      // number of seconds to store this page in cache
      ttl: 60,
    },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      APP_MONNIFYAPIKEY: process.env.APP_MONNIFYAPIKEY,
      APP_MONNIFYCONTRACTCODE: process.env.APP_MONNIFYCONTRACTCODE,
      APP_MONNIFYISTEST: process.env.APP_MONNIFYISTEST,
      APP_MONNIFYISTESTMODE: process.env.APP_MONNIFYISTESTMODE,
    },
  },
  ssr: true,
  plugins: [],
  // @ts-ignore
  googleSignIn: {
    clientId:
      "56799988480-4d51egljupar9la4djc2tknjodn2vsj5.apps.googleusercontent.com",
  },
  colorMode: {
    classSuffix: "",
  },
  css: [
    "vue-toastification/dist/index.css",
    "vue3-carousel/dist/carousel.css",
    "~/assets/css/tailwind.css",
    "~/assets/scss/_button.scss",
    "~/assets/scss/_form.scss",
    "~/assets/scss/style.scss",
  ],
  googleFonts: {
    families: {
      Manrope: [100, 200, 300, 400, 500, 600, 700, 800], // Enable the IntManropeer font
    },
  },
  devtools: { enabled: process.env.NODE_ENV === "development" },
});
