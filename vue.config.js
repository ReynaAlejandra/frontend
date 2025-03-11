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
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
};
