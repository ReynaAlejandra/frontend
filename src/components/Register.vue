<template>
    <div class="registro-usuario-container">
      <div class="registro-usuario">
        <h2>Registro de Usuario</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="nombre" required autocomplete="off" />
          </div>
          <div class="form-group">
            <label for="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" v-model="apellidos" required autocomplete="off" />
          </div>
          <div class="form-group">
            <label for="carnet">Carnet de Identidad:</label>
            <input type="text" id="carnet" v-model="carnet" required autocomplete="off" />
          </div>
          <div class="form-group">
            <label for="grado">Grado:</label>
            <input type="text" id="grado" v-model="grado" required autocomplete="off" />
          </div>
          <div class="form-group">
            <label for="rol">Rol:</label>
            <select id="rol" v-model="rol" required>
              <option value="usuario">Usuario</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input type="text" id="usuario" v-model="usuario" required autocomplete="off" />
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input type="password" id="password" v-model="password" required autocomplete="off" />
            <small v-if="passwordMessage">{{ passwordMessage }}</small>
          </div>
          <button type="submit" class="btn-registrar">Registrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useToast } from 'vue-toastification'
  
  export default {
    data() {
      return {
        nombre: '',
        apellidos: '',
        carnet: '',
        grado: '',
        rol: 'usuario',
        usuario: '',
        password: '',
        passwordMessage: '',
      };
    },
    watch: {
      password(value) {
        this.validatePassword(value)
      }
    },
    methods: {
      validatePassword(password) {
        const conditions = [
          { regex: /.{8,}/,  message: 'Debe tener al menos 8 caracteres' },
          { regex: /[A-Z]/, message: 'Debe tener al menos una letra mayúscula' },
          { regex: /\d/, message: 'Debe tener al menos un número' },
        ]
        this.passwordMessage = conditions
          .filter(condition => !condition.regex.test(password))
          .map(condition => condition.message)
          .join(', ')
      },
      async register() {
        const toast = useToast();
          if (this.passwordMessage) {
            toast.error('La contraseña no cumple con las condiciones necesarias');
            return;
          }
        try {
          const apiUrl = process.env.VUE_APP_API_URL
          const response = await axios.post(`${apiUrl}/usuarios/register`, {
            nombre: this.nombre,
            apellidos: this.apellidos,
            carnet: this.carnet,
            grado: this.grado,
            rol: this.rol,
            usuario: this.usuario,
            password: this.password
          });
          console.log(response.data);
          toast.success('Usuario registrado exitosamente');
          this.clearForm();
          this.$router.push('/');
        } catch (error) {
          //console.error('Error al registrar el usuario:', error);
          toast.error(error.response?.data?.message || 'Error al registrar el usuario')
        }
      },
      clearForm() {
        this.nombre = '';
        this.apellidos = '';
        this.carnet = '';
        this.grado = '';
        this.rol = 'usuario';
        this.usuario = '';
        this.password = '';
        this.errorMessage = '';
        this.passwordMessage = '';
      }
    }
  };
  </script>

<style scoped>
.registro-usuario-container {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 100%;
  background-image: url('@/assets/douglaslogo.png');
  background-size: cover;
  background-position: center;
  padding: 10px 10px 10px 10px;
}
.registro-usuario {
  font-family: system-ui;
  max-width: 400px;
  margin: 0 0 10% 0;
  padding: 20px 80px 30px 80px;
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

input[type="text"],
input[type="password"],
select {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6"/></svg>');
  background-position: right 8px top 50%;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 25px;
}

.btn-registrar {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-registrar:hover {
  opacity: 0.8;
}

</style>