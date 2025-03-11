import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

//toast para pop-up
app.use(Toast, {
  // Opciones de configuración (opcional)
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
});

// Middleware para incluir el token JWT en todas las solicitudes
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Configuración de rutas
router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/register', '/logout'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/');
  }

  next();
});

app.use(router);
app.mount('#app');

import vuetify from './plugins/vuetify'; 

// createApp(App).use(vuetify).mount('#app');
