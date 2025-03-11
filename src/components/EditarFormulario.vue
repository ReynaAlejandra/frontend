<template>
    <div>
      <h2>Editar Formulario</h2>
      <form @submit.prevent="actualizarFormulario">
        <div>
          <label for="hechos">Hechos del Tránsito:</label>
          <textarea id="hechos" v-model="formulario.hechos" maxlength="1000"></textarea>
        </div>
        
        <div>
          <label for="numVehiculos">Número de Vehículos:</label>
            <select id="numVehiculos" v-model="formulario.numVehiculos">
              <option v-for="n in 6" :key="n" :value="n">{{ n }}</option>
            </select>
        </div>
        <div v-for="index in formulario.numVehiculos" :key="index">
          <label :for="'vehiculo' + index">Placa del Vehículo {{ index }}:</label>
          <input :id="'vehiculo' + index" v-model="formulario.vehiculos[index - 1]" />
        </div>

        <div>
          <label for="numConductores">Número de Conductores:</label>
          <select id="numConductores" v-model="formulario.numConductores" @change="updateConductores">
            <option v-for="n in 6" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <div v-for="index in formulario.numConductores" :key="index">
          <label :for="'conductor' + index">CI del Conductor {{ index }}:</label>
          <input :id="'conductor' + index" v-model.number="formulario.conductores[index - 1]" type="number" />
          <button type="button" @click="buscarConductor(index - 1)">Buscar</button>
        </div>

        <div>
          <label for="detalle">Detalle del Hecho:</label>
          <textarea id="detalle" v-model="formulario.detalle" maxlength="1000"></textarea>
        </div>

        <div>
          <label for="numVictimas">Número de Víctimas:</label>
          <select id="numVictimas" v-model="formulario.numVictimas" @change="updateVictimas">
            <option v-for="n in 6" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <div v-for="index in formulario.numVictimas" :key="index">
          <label :for="'victima' + index">CI de la Víctima {{ index }}:</label>
          <input :id="'victima' + index" v-model.number="formulario.victimas[index - 1]" type="number" />
          <button type="button" @click="buscarVictima(index - 1)">Buscar</button>
        </div>

        <div>
          <label for="fechaRegistro">Fecha y Hora del Hecho:</label>
          <input type="datetime-local" id="fechaRegistro" v-model="formulario.fechaRegistro" />
        </div>
        <div>
          <label for="usuario">Usuario:</label>
          <input type="text" id="usuario" :value="formulario.usuario" readonly>
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditarFormulario',
    data() {
      return {
        formulario: {
          hechos: '',
          numVehiculos: 1,
          vehiculos: Array(6).fill(''),
          numConductores: 1,
          conductores: Array(6).fill(''),
          detalle: '',
          numVictimas: 1,
          victimas: Array(6).fill(''),
          fechaRegistro: '',
          usuario: '',
        }
      };
    },
    methods: {
      updateConductores() {
        this.formulario.conductores = Array(this.formulario.numConductores).fill('');
      },
      updateVictimas() {
        this.formulario.victimas = Array(this.formulario.numVictimas).fill('');
      },
      async actualizarFormulario() {
        try {
          const response = await axios.put(`http://127.0.0.1:5000/api/accidentes/formulario/${this.$route.params.id}`, this.formulario);
          console.log(response.data);
          alert('Formulario actualizado con éxito');
          // Redireccionar a la página de detalles o lista de formularios actualizados
          this.$router.push('/hechos');
        } catch (error) {
          console.error('Error al actualizar el formulario:', error);
          alert('Error al actualizar el formulario');
        }
      },
      async obtenerFormulario() {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/api/accidentes/formulario/${this.$route.params.id}`);
          this.formulario = response.data;
          this.updateConductores();
          this.updateVictimas();
        } catch (error) {
          console.error('Error al obtener el formulario:', error);
        }
      },
      async buscarConductor(index) {
        try {
          const ci = this.formulario.conductores[index];
          const response = await axios.get(`http://127.0.0.1:5000/api/conductores/${ci}`);
          if (response.data) {
            console.log(`Conductor encontrado: ${response.data}`);
          } else {
            alert('Conductor no encontrado');
          }
        } catch (error) {
          console.error('Error al buscar conductor:', error);
        }
      },
      async buscarVictima(index) {
        try {
          const ci = this.formulario.victimas[index];
          const response = await axios.get(`http://127.0.0.1:5000/api/victimas/${ci}`);
          if (response.data) {
            console.log(`Víctima encontrada: ${response.data}`);
          } else {
            alert('Víctima no encontrada');
          }
        } catch (error) {
          console.error('Error al buscar víctima:', error);
        }
      }
    },
    watch: {
      'formulario.numConductores': 'updateConductores',
      'formulario.numVictimas': 'updateVictimas'
    },
    created() {
      this.obtenerFormulario()
    }
  };
  </script>
  
  <style> </style>