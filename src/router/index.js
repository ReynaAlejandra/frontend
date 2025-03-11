import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Formulario from '../components/Formulario.vue';
import Hechos from '../components/Hechos.vue'
import Logout from '../components/Logout.vue';
import Usuarios from '../components/Usuarios.vue'
import EditarFormulario from '../components/EditarFormulario.vue'
import EditarUsuario from '@/components/EditarUsuario.vue';
import ModalFormulario from '@/components/ModalFormulario.vue';

const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresAdmin: true }
    },
    {
      path: '/formulario',
      name: 'Formulario',
      component: Formulario,
      meta: { requiresAuth: true }
    },
    {
      path: '/hechos',
      name: 'Hechos',
      component: Hechos,
      meta: { requiresAuth: true }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: { requiresAuth: true }
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: Usuarios,
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/editar/:id',
    //   name: 'EditarFormulario',
    //   component: EditarFormulario,
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/modal-formulario/:id',
      name: 'ModalFormulario',
      component: ModalFormulario,
      props: true
    },
    {
      path: '/editar-usuario/:id',
      name: 'EditarUsuario',
      component: EditarUsuario,
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Autenticación de usuario y autorización
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const userDataString = localStorage.getItem('userData');

    if (!userId || !token) {
      next({ name: 'Login' });
    } else {
      try {
        const userData = userDataString ? JSON.parse(userDataString) : null;
        if (to.matched.some(record => record.meta.requiresAdmin) && userData && userData.rol !== 'administrador') {
          alert('No tienes permiso para acceder a esta página.');
          next({ name: 'Formulario' });
        } else {
          next();
        }
      } catch (error) {
        console.error('Error al analizar userData:', error);
        localStorage.removeItem('userData'); // Limpiar el localStorage si hay un error de parsing
        next({ name: 'Login' });
      }
    }
  } else {
    next();
  }
});
  
export default router;