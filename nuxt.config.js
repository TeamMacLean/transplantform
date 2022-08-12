import bodyParser from 'body-parser';

require('dotenv').config();

export default {
  server: {
    port: process.env.PORT || 3000, // default: 3000
    host: process.env.HOST || 'localhost', // default: localhost
  },
  env: {
    WEBMASTER: process.env.WEBMASTER,
    ADMIN_GROUP_EMAIL: process.env.ADMIN_GROUP_EMAIL,
    DIVERT_EMAILS_USERNAME: process.env.DIVERT_EMAILS_USERNAME,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    WEBMASTER_TESTING: process.env.WEBMASTER_TESTING,
  },
  telemetry: false,
  // DOES NOT WORK COS MODELS ISSUE watch: ['~/api/*.js'],
  /*
   ** Headers of the page
   */
  head: {
    title: 'TransPlant',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Server Middleware
   */
  serverMiddleware: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    '~/api',
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#31CF65' },
  /*
   ** Global CSS
   */
  css: ['~/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-fontawesome', //V5
    'vue-sweetalert2/nuxt',
    'nuxt-buefy',
  ],
  fontawesome: {
    imports: [
      //import whole set
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: [
          'faFillDrip',
          'faSpinner',
          'faSearch',
          'faEllipsisV',
          'faUpload',
        ],
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['faUserCircle', 'faEdit', 'faSave', 'faCheckCircle'],
      },
    ],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL,
  },
  buefy: {},
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/logout', method: 'post' },
          user: { url: '/api/user', method: 'get', propertyName: 'user' },
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
      },
    },
    redirect: {
      login: '/signin',
    },
  },
  router: {
    linkActiveClass: 'is-active',
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    },
  },
};
