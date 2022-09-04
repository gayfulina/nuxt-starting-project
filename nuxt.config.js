const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'WD Blog',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: 'yellow', duration: 5000, height: '5px'},
  loadingIndicator: {
    name: 'circle',
    color: 'blue'
  },


  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-e294b-default-rtdb.firebaseio.com'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-e294b-default-rtdb.firebaseio.com',
    fbAPIKey: 'AIzaSyA_p9RDxA97ktW3jGnsFRmrLer__BzB3dM'
  },
  router: {
    middleware: 'log'
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
