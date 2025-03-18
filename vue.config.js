// module.exports = {
//     devServer: {
//       proxy: {
//         '/api': {
//           target: 'https://10.0.0.93',
//           changeOrigin: true,
//           secure: false, // Esto desactiva la verificación del certificado SSL
//           pathRewrite: { '^/api': '' }
//         }
//       }
//     }
//   };

// export default {
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'https://edapi.mingobierno.gob.bo/soat_api',
//         changeOrigin: true,
//       },
//     },
//   },
// };

module.exports = {
  publicPath:'/soat/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://edapi.mingobierno.gob.bo/soat_api',
        // target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
    },
  },
};
