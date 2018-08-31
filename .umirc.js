export default {
  plugins: [
    ['umi-plugin-dva'],
    ['umi-plugin-routes', {
      exclude: [
        /components/,
        /models/,
        /services/,
      ],
    }],
  ],
  theme: './src/themes/themes.js',
  ignoreMomentLocale: true,
  pages: {
    '/maintain/:id': {Route: './src/routes/authRoute.js'},
    '/project/add': {Route: './src/routes/authRoute.js'},
    '/project/info': {Route: './src/routes/authRoute.js'},
    '/project/info/:id': {Route: './src/routes/authRoute.js'},
    '/project/detail/:id': {Route: './src/routes/authRoute.js'},
    '/project/chaincode/:id': {Route: './src/routes/authRoute.js'},
    '/project/chaincode/add/:id': {Route: './src/routes/authRoute.js'},
    '/project/chaincode/detail/:id': {Route: './src/routes/authRoute.js'},
    '/center': {Route: './src/routes/authRoute.js'},
    '/admin': {Route: './src/routes/authRoute.js'},
    '/admin/user': {Route: './src/routes/authRoute.js'},
    '/admin/log': {Route: './src/routes/authRoute.js'},
    '/panel': {Route: './src/routes/authRoute.js'},
  }
};
