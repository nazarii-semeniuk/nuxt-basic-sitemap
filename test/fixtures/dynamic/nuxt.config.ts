import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  simpleSitemap: {
    includeStaticPages: false,
    include: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))

      return [
        '/blog',
        { url: '/custom', changefreq: 'daily' },
      ]
    }
  }
})
