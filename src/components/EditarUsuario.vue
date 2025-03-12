<template>
    <div class="editar-usuario-container">
      <div class="editar-usuario">
        <h2>Editar Usuario</h2>
        <form @submit.prevent="actualizarUsuario">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" v-model="usuario.nombre" required />
          </div>
          <div class="form-group">
            <label for="apellidos">Apellidos:</label>
            <input type="text" v-model="usuario.apellidos" required />
          </div>
          <div class="form-group">
            <label for="carnet">Carnet:</label>
            <input type="text" v-model="usuario.carnet" required />
          </div>
          <div class="form-group">
            <label for="grado">Grado:</label>
            <input type="text" v-model="usuario.grado" required />
          </div>
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input type="text" v-model="usuario.usuario" required />
          </div>
          <div class="form-group">
            <label for="rol">Rol:</label>
            <select v-model="usuario.rol" required>
              <option value="usuario">Usuario</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-eliminar" @click="eliminarUsuario">Eliminar Usuario</button>
            <button type="submit" class="btn-guardar">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditarUsuario',
    data() {
      return {
        usuario: {
          nombre: '',
          apellidos: '',
          carnet: '',
          grado: '',
          usuario: '',
          rol: ''
        }
      };
    },
    created() {
      const userId = this.$route.params.id;
      const token = localStorage.getItem('token');
      const apiUrl = process.env.VUE_APP_API_URL
      axios.get(`${apiUrl}/usuarios/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.usuario = response.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.cargarUsuario()
    },
    methods: {
      cargarUsuario() {
        const userId = this.$route.params.id;
        const token = localStorage.getItem('token');
        const apiUrl = process.env.VUE_APP_API_URL
        axios.get(`${apiUrl}/usuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.usuario = response.data;
        })
        .catch(error => {
          console.log(error);
        });
      },
      actualizarUsuario() {
        const userId = this.$route.params.id;
        const token = localStorage.getItem('token');
        const apiUrl = process.env.VUE_APP_API_URL
        axios.put(`${apiUrl}/usuarios/${userId}`, this.usuario, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            alert('Usuario actualizado correctamente');
            this.$router.push('/usuarios');
          })
          .catch(error => {
            console.log(error);
          });
      },
      eliminarUsuario() {
        const userId = this.$route.params.id;
        const token = localStorage.getItem('token');
        const apiUrl = process.env.VUE_APP_API_URL
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
          axios.delete(`${apiUrl}/usuarios/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            alert('Usuario eliminado correctamente');
            this.$router.push('/usuarios');
          })
          .catch(error => {
            console.log(error)
            alert('Error al eliminar ususario')
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .editar-usuario-container {
    display: flex;
    justify-content: center;
    height: 100%;
    background-image: url('@/assets/douglaslogo.png');
    background-size: cover;
    background-position: center;
    padding: 10px 10px 10px 10px;
  }

  .editar-usuario {
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
  
  .btn-eliminar,
  .btn-guardar {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-eliminar {
    background-color: #dc3545;
    color: #fff;
  }
  
  .btn-guardar {
    background-color: #007bff;
    color: #fff;
  }
  
  .btn-eliminar:hover,
  .btn-guardar:hover {
    opacity: 0.8;
  }
  </style>