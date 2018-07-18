const sass = require('@stencil/sass');

exports.config = {
  namespace: 'ion-design',
  globalStyle: 'src/global/style.scss',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: false
    }
  ],
  plugins: [
    sass()
  ]
};
