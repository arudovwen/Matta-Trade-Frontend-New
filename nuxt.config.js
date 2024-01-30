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
    "@vite-pwa/nuxt",
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
    useHostPrefix: false,
    pages: ["/"],

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
  // plugins: ["~/plugins/apexcharts.client.js"],
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
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Matta trade",
      short_name: "Matta",
      theme_color: "#165EF0",
      display: "standalone",
      icons: [
        {
          src: "/icons/android-icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/icons/android-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/icons/android-icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
      ],
      screenshots: [
        {
          src: "/shot2.png",
          type: "image/png",
          sizes: "436x720",
          form_factor: "narrow",
        },
        {
          src: "/shot1.png",
          type: "image/png",
          sizes: "1280x686",
          form_factor: "wide",
        },
      ],
    },
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
  },
  client: {
    installPrompt: true,
    periodicSyncForUpdates: 3600,
  },
});
