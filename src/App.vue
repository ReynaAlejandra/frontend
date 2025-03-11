<template>
  <div id="app">
    <nav v-if="showNavbar" class="navbar">
      <!-- <router-link to="/" class="nav-link">Inicio de Sesión</router-link> -->
      <router-link to="/formulario" class="nav-link">Formulario</router-link>
      <router-link to="/hechos" class="nav-link">Hechos</router-link>
      <div class="dropdown">
        <span class="nav-link dropdown-toggle">Usuarios del Sistema</span>
        <div v-if="isAdmin" class="dropdown-content">
          <router-link to="/register" class="nav-link">Registrar Usuario</router-link>
          <router-link to="/usuarios" class="nav-link">Usuarios Registrados</router-link>
        </div>
      </div>
      <div v-if="loggedIn" class="dropdown">
        <span class="nav-link dropdown-toggle">Perfil</span>
        <div class="dropdown-content">
          <div class="user-info">
            <p><strong>Nombre: </strong>{{ userData.nombre }} {{ userData.apellidos }}</p>
            <p><strong>Grado: </strong>{{ userData.grado }}</p>
            <p v-if="isAdmin"><strong>Rol: </strong>Administrador</p>
            <p><strong>Usuario: </strong>{{ userData.usuario }}</p>
          </div>
          <div class="dropdown-divider"></div>
          <a href="#" @click="logout" class="dropdown-item">Cerrar Sesión</a>
        </div>
      </div>
    </nav>
    <router-view :userData="userData" :loggedIn="loggedIn" :isAdmin="isAdmin" @loginSuccess="fetchUserData"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      loggedIn: false,
      userData: {},
      isAdmin: false
    };
  },
  computed: {
    showNavbar() {
      return this.$route.path !== '/';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userData')
      this.loggedIn = false
      this.userData = {}; // limpiar data en logout
      this.isAdmin = false
      this.$router.push('/');
    },
    fetchUserData() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const userDataString = localStorage.getItem('userData');

      if (userId && token && userDataString) {
        try {
          this.userData = JSON.parse(userDataString);
          this.loggedIn = true;
          this.isAdmin = this.userData.rol === 'administrador';
        } catch (e) {
          console.error('Error al analizar userData:', e);
          this.loggedIn = false;
          this.isAdmin = false;
        }
      } else {
        this.logout();
      }
    }
  },
  created() {
    this.fetchUserData()

    window.addEventListener('beforeunload', () => {
      this.logout()
    })
  }
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1em;
  background-color: #003303c9;
  border-bottom: 0.01em solid #ccc;
  font-family: system-ui;
}

.nav-link {
  text-decoration: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5cm;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #8baf8b;
}

/* Estilos para el dropdown */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100px;
  z-index: 1;
  border: 1px solid #8baf8b;
  border-radius: 5px;
  margin: 5px;
}

.dropdown-content a {
  color: #000000;
  padding: 15px 40px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-toggle::after {
  content: ' \25BC';
  margin-left: 5px;
  font-size: 0.75em;
}

.dropdown-content .dropdown-item {
  color: #000000;
  padding: 10px 15px;
  text-decoration: none;
  display: block;
}

.dropdown-content .dropdown-item:hover {
  background-color: #ddd;
}

/* Estilos para la sección de información del usuario */
.user-info {
  padding: 10px;
  background-color: #f9f9f9;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.user-info div {
  margin-bottom: 10px;
}

.user-info p {
  margin: 5px 0;
  padding: 5px 40px;
}

.user-info p:last-child {
  margin-bottom: 0;
}
</style>