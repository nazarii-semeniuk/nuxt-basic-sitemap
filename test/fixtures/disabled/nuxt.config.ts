import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  simpleSitemap: {
    enabled: false,
  }
})
