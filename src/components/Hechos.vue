<template>
    <div class="hechos">
      <h2><u>LISTA DE HECHOS DE TRÁNSITO</u></h2>
      <div class="table-responsive">
        <div class="search-container">
          <input type="text" v-model="searchQuery" placeholder="Buscar por número de caso, CI de conductores o placa" class="search-input" />
        </div>
        <table class="table table-striped">
          <thead class="thead">
            <tr>
              <th>Caso N°</th>            
              <th>Día, Hora y Fecha del Hecho</th>
              <th>Placas de Vehículos Implicados</th>
              <th>CI de Conductores Implicados</th>
              <th>Detalles del hecho</th>
              <th>Denunciante</th>
              <th>Registrado por</th>
              <th>Ver Detalles</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="formulario in formularios" :key="formulario._id">
            <td>{{ formulario.hechos[0].casoNumero }}</td>
            <td>{{ formatearFecha(formulario.hechos[0].diaHoraFecha) }}</td>
            <td>
              <ul class="no-bullets">
                <li v-for="vehiculo in formulario.vehiculos" :key="vehiculo._id">{{ vehiculo.placa }}</li>
              </ul>
            </td>
            <td>
              <ul class="no-bullets">
                <li v-for="conductor in formulario.conductores" :key="conductor._id">{{ conductor.ci }}</li>
              </ul>
            </td>
            <td class="detalles-col">
              <p>{{ formulario.detalle }}</p>
            </td>
            <td>{{ formulario.hechos[0].denunciante }}</td>
            <td>{{ formulario.usuario }}</td>
            <td>
              <div v-if="userRole === 'administrador'"><button @click="abrirModal(formulario._id)" class="btn btn-primary" >Ver detalles</button></div>
              
              <button @click="generarReporte(formulario._id)" class="btn btn-primary" >Generar Reporte</button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
      <ModalFormulario v-if="mostrarModal" :formulario="formularioActual" :formularioId="formularioIdSeleccionado" @cerrarModal="cerrarModal" @guardarCambios="guardarCambios" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ModalFormulario from './ModalFormulario.vue'
  
  export default {
    name: 'Hechos',
    components: { ModalFormulario },
    data() {
      return {
        searchQuery: '',
        formularios: [],
        mostrarModal: false,
        formularioIdSeleccionado: null,
        formularioActual: null,
      };
    },
    computed: {
      filteredFormularios() {
        const searchQuery = this.searchQuery.toLowerCase().trim();
        if (!searchQuery) {
          return this.formularios;
        }
        return this.formularios.filter(formulario => {
          const casoNumero = formulario.hechos && formulario.hechos.length > 0 
            ? formulario.hechos[0].casoNumero.toString().toLowerCase() : '';
          
          // Filtrar por número de caso
          const casoNumeroValido = casoNumero.includes(searchQuery);

          // Filtrar por CI de todos los conductores
          const ciConductores = formulario.conductores && formulario.conductores.length > 0
            ? formulario.conductores.some(conductor => conductor.ci.toString().toLowerCase().includes(searchQuery))
            : false;

          // Filtrar por placas de todos los vehículos
          const placasVehiculos = formulario.vehiculos && formulario.vehiculos.length > 0
            ? formulario.vehiculos.some(vehiculo => vehiculo.placa.toLowerCase().includes(searchQuery))
            : false;
console.log(this.formularios);
          return (
            casoNumeroValido ||
            ciConductores ||
            placasVehiculos
          );
        });
      },
    },
    methods: {
      buscar() {
      },
      formatearFecha(fecha) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', options);
        return fechaFormateada;
      },
      async fetchFormularios() {
        try {
          const apiUrl = process.env.VUE_APP_API_URL
          const response = await axios.get(`${apiUrl}/accidentes`);
          console.log("response", response);
          // this.formularios = response.data;
          this.formularios = response.data.sort((a, b) => new Date(b.hechos[0].diaHoraFecha) - new Date(a.hechos[0].diaHoraFecha));
        } catch (error) {
          console.error('Error al obtener accidentes:', error);
        }
      },
      async cargarFormularios() {
        try {
          const apiUrl = process.env.VUE_APP_API_URL
          const response = await axios.get(`${apiUrl}/accidentes`);
          // this.formularios = response.data;
          this.formularios = response.data.sort((a, b) => new Date(b.hechos[0].diaHoraFecha) - new Date(a.hechos[0].diaHoraFecha));
        } catch (error) {
          console.error('Error al obtener los formularios:', error);
        }
      },
      async abrirModal(id) {
        this.formularioIdSeleccionado = id;
        try {
          const apiUrl = process.env.VUE_APP_API_URL
          const response = await axios.get(`${apiUrl}/accidentes/formulario/${id}`);
          this.formularioActual = response.data;
          this.mostrarModal = true;
        } catch (error) {
          console.error('Error al obtener los detalles del formulario:', error);
        }
      },
      async guardarCambios(formularioActualizado, formularioId) {
        try {
          const apiUrl = process.env.VUE_APP_API_URL
          const response = await axios.put(`${apiUrl}/accidentes/${formularioId}`, formularioActualizado);
          console.log('Formulario actualizado:', response.data);
          
          // Actualizar localmente los formularios si es necesario
          const index = this.formularios.findIndex(formulario => formulario._id === formularioId);
          if (index !== -1) {
            this.formularios[index] = response.data
          }

          // Cerrar la ventana modal después de guardar los cambios
          this.cerrarModal();
        } catch (error) {
          console.error('Error actualizando formulario:', error);
        }
      },
      cerrarModal() {
        this.mostrarModal = false;
        this.formularioIdSeleccionado = null;
        this.formularioActual = null;
      },
      //generar reporte con jsreport
      async generarReporte(formularioId) {
        try {
          const apiUrl = process.env.VUE_APP_API_URL
          const response = await axios.get(`${apiUrl}/accidentes/reporte/${formularioId}`, {
            responseType: 'blob'
          });
          // Buscar el formulario correspondiente por ID
          const formulario = this.formularios.find(f => f._id === formularioId);
            if (!formulario) {
              console.error('No se encontró el formulario');
              return;
          }
          // Crear un enlace temporal para la descarga del archivo PDF
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Caso N° ${formulario.hechos[0].casoNumero}.pdf`);
          document.body.appendChild(link);
          link.click();
          // Limpiar el enlace después de la descarga
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error generando el reporte:', error);
        }
      },
    },
    async created() {
      this.cargarFormularios()
      this.fetchFormularios()
    },
    mounted() {
      // this.fetchFormularios()
    },
    computed: {
  userRole() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData ? userData.rol : null; // Devuelve el rol si existe
  }
}


  }
  </script>
  
<style scoped>
.table-responsive {
  width: 90%;
  overflow-x: auto;
  font-family: system-ui;
  margin-top: 1cm;
  margin-left: auto;
  margin-right: auto;
}
.search-input {
  width: 90%;
  padding: 0.5cm;
  margin-bottom: 1cm;
  border: 0.1cm solid #003303;
  border-radius: 0.5cm;
  font-size: 14px;
  text-transform: uppercase;
}
table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(107, 141, 104, 0.842);
  color: rgb(0, 0, 0);

  background-image: url('../assets/douglaslogo5.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  text-transform: uppercase;
}
thead {
  color: white
}
th, td {
  border: 1px solid rgb(1, 85, 15);
  padding: 0.3cm;
}
th {
  background-color: #003303;
}
ul {
  padding-left: 0.5cm;
}
li {
  list-style-type: disc;
  color: rgb(0, 0, 0)
}
.hechos {
  font-family: system-ui;
  text-align: center;
  color: #003303;
  margin-top: 1cm;
}
button {
  padding: 0.2cm 0.4cm;
  background-color: #003303;
  color: white;
  border: none;
  border-radius: 0.25cm;
  cursor: pointer;
  margin-top: 0.5cm;
}
button:hover {
  background-color: #8fdb85;
}

.no-bullets {
  padding: 0;
  margin: 0;
}
.no-bullets li {
  list-style-type: none;
  margin-left: 0;
  padding-left: 0;
}

.detalles-col {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>