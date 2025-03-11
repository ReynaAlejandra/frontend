<template>
  <div class="usuarios-container">
    <div class="usuarios">
      <h2 class="titulo">Usuarios Registrados</h2>
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar usuario" 
          class="search-input"
        />
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Carnet</th>
              <th>Grado</th>
              <th>Usuario</th>
              <th v-if="isAdmin">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsuarios" :key="user._id">
              <td>{{ user.nombre }}</td>
              <td>{{ user.apellidos }}</td>
              <td>{{ user.carnet }}</td>
              <td>{{ user.grado }}</td>
              <td>{{ user.usuario }}</td>
              <td v-if="isAdmin">
                <button class="btn-editar" @click="editarUsuario(user._id)">Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Usuarios',
    props: {
      isAdmin: Boolean
    },
    data() {
      return {
        usuarios: [],
        searchQuery: '',
      };
    },
    created() {
      const token = localStorage.getItem('token')
      axios.get('http://127.0.0.1:5000/api/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.usuarios = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    computed: {
      filteredUsuarios() {
        const query = this.searchQuery.toLowerCase().trim();
        if (!query) {
          return this.usuarios;
        }
        return this.usuarios.filter(user => {
          return (
            user.nombre.toLowerCase().includes(query) ||
            user.apellidos.toLowerCase().includes(query) ||
            user.carnet.toLowerCase().includes(query) ||
            user.grado.toLowerCase().includes(query) ||
            user.usuario.toLowerCase().includes(query)
          );
        });
      }
    },
    methods: {
      editarUsuario(userId) {
        this.$router.push(`/editar-usuario/${userId}`)
      }
    }
  };
  </script>
  
  <style scoped>
  .usuarios-container {
    display: flex;
    justify-content: center;
    align-items: start;
    height: 100vh;
    background-image: url('@/assets/douglaslogo.png');
    background-size: cover;
    background-position: center;
    padding: 10px;
  }
  .usuarios {
    font-family: system-ui;
    max-width: 100%;
    margin: 0 auto;
    padding: 15px 50px 40px 50px;
    border: 5px solid #686868;
    border-radius: 30px;
    background-color: #f9f9f9;
    box-shadow: 0 0px 10px rgba(28, 104, 5, 0.548);
  }

  .titulo {
    color: #000000;
  }

  .search-container input {
    width: 96.5%;
    padding: 0.5cm;
    margin-bottom: 1cm;
    border: 0.1cm solid #003303;
    border-radius: 0.5cm;
    font-size: 14px;
    }
  
  .table-container {
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: #fff;
    border: 0px solid #ddd;
    border: 0px solid #686868;
  }
  
  th, td {
    padding: 20px 80px 20px 80px;
    border-bottom: 0px solid #ddd;
  }
  
  th {
    text-align: center;
    background-color: #f2f2f2;
    border-block: 2px solid #686868;
  }
  td {
    text-align: left;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
  
  .btn-editar {
    padding: 6px 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-editar:hover {
    background-color: #0056b3;
  }
  </style>