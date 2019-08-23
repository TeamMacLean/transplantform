import bodyParser from 'body-parser';

require('dotenv').config();


export default {
  mode: 'universal',
  server: {
    port: process.env.PORT || 3000, // default: 3000
    host: process.env.HOST || 'localhost', // default: localhost
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Server Middleware
   */
  serverMiddleware: [
    bodyParser.json(),
    bodyParser.urlencoded({extended: false}),
    '~/api'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#31CF65'},
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
  ],
  fontawesome: {
    imports: [
      //import whole set
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['faFillDrip', 'faSpinner', 'faSearch', 'faEllipsisV', 'faUpload']
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['faUserCircle', 'faEdit', 'faSave', 'faCheckCircle']
      },
    ]
  },
  /*
** Axios module configuration
** See https://axios.nuxtjs.org/options
*/
  axios: {
    baseURL: process.env.API_URL
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/api/login', method: 'post', propertyName: 'token'},
          logout: {url: '/api/logout', method: 'post'},
          user: {url: '/api/user', method: 'get', propertyName: 'user'}
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    },
    redirect: {
      login: '/signin',
    }
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
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
