<template>
    <div>
      <p>Cerrando sesión...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Logout',
    created() {
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      this.$router.push('/');
    }
  };
  </script>
  
  <style>
  /* Estilos para el componente de cierre de sesión */
  </style>
  