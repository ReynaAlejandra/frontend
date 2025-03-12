<template>
    <div class="inicio-sesion-container">
      <div class="inicio-sesion">
        <h2>Inicio de Sesión</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input type="text" id="usuario" v-model="usuario" autocomplete="off" required />
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <div class="password-wrapper">
              <input :type="passwordFieldType" id="password" v-model="password" autocomplete="off" required />
              <span @click="togglePasswordVisibility" class="password-toggle">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5C7.0589 5 2.9411 7.5139 1 12c1.9411 4.4861 6.0589 7 11 7s9.0589-2.5139 11-7c-1.9411-4.4861-6.0589-7-11-7zm0 2c2.2203 0 4.2674.888 5.814 2.3399-1.5531 1.4497-3.5946 2.3156-5.814 2.3156s-4.2609-.8659-5.814-2.3156C7.7326 7.888 9.7797 7 12 7zm-1 3h2v2h-2v-2zm2 6c-2.4853 0-4.5-2.0147-4.5-4.5S10.5147 7.5 13 7.5 17.5 9.5147 17.5 12 15.4853 16 13 16z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5C7.0589 5 2.9411 7.5139 1 12c1.9411 4.4861 6.0589 7 11 7s9.0589-2.5139 11-7c-1.9411-4.4861-6.0589-7-11-7zm0 2c2.2203 0 4.2674.888 5.814 2.3399-1.5531 1.4497-3.5946 2.3156-5.814 2.3156s-4.2609-.8659-5.814-2.3156C7.7326 7.888 9.7797 7 12 7zm-1 3h2v2h-2v-2zm2 6c-2.4853 0-4.5-2.0147-4.5-4.5S10.5147 7.5 13 7.5 17.5 9.5147 17.5 12 15.4853 16 13 16z" />
                </svg>
              </span>
            </div>
          </div>
          <button type="submit" class="btn-iniciar-sesion">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  
  export default {
    name: 'Login',
    data() {
      return {
        usuario: '',
        password: '',
        showPassword: false
      };
    },
    setup(){
      const router = useRouter()
      const toast = useToast()
      return {router, toast}
    },
    computed: {
      passwordFieldType() {
        return this.showPassword ? 'text' : 'password';
      },
    },
    methods: {
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },
      async login() {
        try {
          const apiUrl = process.env.VUE_APP_API_URL
          const response = await axios.post(`/usuarios/login`, {
            usuario: this.usuario,
            password: this.password
          });
          
          // Verificar la respuesta de la API
          if (response.data.token && response.data.userId && response.data.userData) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.userId)
            localStorage.setItem('userData', JSON.stringify(response.data.userData))

          // Verificar si el rol se guarda correctamente
          const userData = JSON.parse(localStorage.getItem('userData'));
          console.log('Rol del usuario:', userData.rol);
            
            this.toast.success('Inicio de sesión correcto');
            this.$emit('loginSuccess');
            this.router.push('/formulario');
          } else {
            this.toast.error('Credenciales inválidas');
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          this.toast.error('Error al iniciar sesión');
        }
      }
    }
  };
  </script>

<style scoped>
.inicio-sesion-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/douglaslogo.png');
  background-size: cover;
  background-position: center;
}

.inicio-sesion {
  font-family: system-ui;
  max-width: 400px;
  margin: 0 auto;
  padding: 80px;
  border: 5px solid #686868;
  border-radius: 30px;
  background-color: #f9f9f9;
  box-shadow: 0 0px 10px rgba(28, 104, 5, 0.548);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  width: 100%;
  padding-right: 30px; /* Espacio para el icono del ojo */
}

.password-toggle {
  position: absolute;
  right: 10px;
  cursor: pointer;
  user-select: none;
}

.password-toggle svg {
  fill: #888;
  width: 20px;
  height: 20px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-iniciar-sesion {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-iniciar-sesion:hover {
  opacity: 0.8;
}
</style>