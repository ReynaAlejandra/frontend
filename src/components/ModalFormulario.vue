<template>
  <div class="modal-overlay" v-if="formulario">
    <div class="modal-content" id="elemento-a-pdf">
      <h1>Formulario</h1>

      <!-- Datos del Hecho de Tránsito -->
      <div class="subt">
        <h3><strong>1. Datos del Hecho de Tránsito</strong></h3>
      </div>
      <div class="form-group">
        <label for="denunciante">Denunciante:</label>
        <input type="text" id="denunciante" v-model="formulario.hechos[0].denunciante" :readonly="!editable" />
      </div>
      <div class="form-group">
        <label for="casoNumero">Caso N°:</label>
        <input type="text" id="casoNumero" v-model="formulario.hechos[0].casoNumero" :readonly="!editable" />
      </div>
      <div class="form-group">
        <label for="naturaleza">Naturaleza del Hecho:</label>
        <input type="text" id="naturaleza" v-model="formulario.hechos[0].naturaleza" :readonly="!editable" />
      </div>
      <div class="form-group">
        <label for="departamento">Departamento:</label>
        <input type="text" id="departamento" v-model="formulario.hechos[0].departamento" :readonly="!editable" />
      </div>
      <div class="form-group">
        <label for="estacionPolicial">Estación Policial:</label>
        <input type="text" id="estacionPolicial" v-model="formulario.hechos[0].estacionPolicial" :readonly="!editable" />
      </div>
      <div class="form-group">
        <label for="lugar">Lugar del Hecho:</label>
        <input type="text" id="lugar" v-model="formulario.hechos[0].lugar" :readonly="!editable" />
      </div>
      <div class="form-group">
        <label for="diaHoraFecha">Día, Hora y Fecha del Hecho:</label>
        <input type="datetime-local" id="diaHoraFecha" v-model="formulario.hechos[0].diaHoraFecha"  :readonly="!editable" />
      </div>


      <!-- vehiculos -->
      <div class="subt">
        <h3><strong>2. Datos de los Vehículos</strong></h3>
      </div>
        <div v-if="editable" class="form-group">
          <button @click="agregarVehiculo">+ Añadir Vehículo</button>
        </div>

      <div v-for="(vehiculo, index) in formulario.vehiculos" :key="index">
        <h4>Vehículo {{ index + 1 }}</h4>
          <div class="form-group">
            <label :for="'placa' + index">Placa:</label>
            <input type="text" :id="'placa' + index" v-model="vehiculo.placa" :readonly="!editable" />
            <button type="button" @click="confirmarBuscarVehiculo(index)" v-if="editable">Buscar</button>
          </div>
          <div class="form-group">
            <label :for="'marca' + index">Marca:</label>
            <input type="text" :id="'marca' + index" v-model="vehiculo.marca" :readonly="!editable" />
          </div>
          <div class="form-group">
            <label :for="'modelo' + index">Modelo:</label>
            <input type="text" :id="'modelo' + index" v-model="vehiculo.modelo" :readonly="!editable" />
          </div>
          <div class="form-group">
            <label :for="'clase' + index">Tipo Vehículo:</label>
            <input type="text" :id="'clase' + index" v-model="vehiculo.clase" :readonly="!editable" />
          </div>
          <div class="form-group">
            <label :for="'color' + index">Color:</label>
            <input type="text" :id="'color' + index" v-model="vehiculo.color" :readonly="!editable" />
          </div>



          <div class="form-group">
            <label :for="'empresa' + index">Empresa o Institución a la que pertenece el vehículo:</label>
            <input type="text" :id="'empresa' + index" v-model="vehiculo.empresa" :readonly="!editable" />
          </div>
          <div class="form-group">
            <label :for="'tipoUso' + index">Tipo de servicio:</label>
            <input type="text" :id="'tipoUso' + index" v-model="vehiculo.tipoUso" :readonly="!editable" />
          </div>



      </div>

      <!-- conductores -->
      <div class="subt">
        <h3><strong>3. Datos de los Conductores</strong></h3>
      </div>
      <div v-if="editable" class="form-group">
        <button @click="agregarConductor">+ Añadir Conductor</button>
      </div>

      <div v-for="(conductor, index) in formulario.conductores" :key="index">
        <h4>Conductor {{ index + 1 }}</h4>
          <div class="form-group">
            <label :for="'ci' + index">CI:</label>
            <input type="text" :id="'ci' + index" v-model="conductor.ci" :readonly="!editable" />
            <button type="button" @click="confirmarBuscarConductor(index)" v-if="editable">Buscar</button>
          </div>
          <div class="form-group">
            <label :for="'nombre' + index">Nombre:</label>
            <input type="text" :id="'nombre' + index" v-model="conductor.nombre" :readonly="!editable" />
          </div>
          <div class="form-group">
            <label :for="'edad' + index">Edad:</label>
            <input type="text" :id="'edad' + index" v-model="conductor.edad" :readonly="!editable" />
          </div>
          <div class="form-group">
            <label :for="'domicilio' + index">Domicilio:</label>
            <input type="text" :id="'domicilio' + index" v-model="conductor.domicilio" :readonly="!editable" />
          </div>
          <div class="form-group">
            <label :for="'licencia' + index">Licencia de Conducir N°:</label>
            <input type="text" :id="'licencia' + index" v-model="conductor.licencia" :readonly="!editable" />
          </div>
          <div class="form-group">
            <label :for="'categoria' + index">Categoría:</label>
            <input type="text" :id="'categoria' + index" v-model="conductor.categoria" :readonly="!editable" />
          </div>
          
          
          
          <div class="form-group">
            <label :for="'licDesde' + index">Vigencia desde:</label>
            <input type="datetime-local" :id="'licDesde' + index" v-model="conductor.licDesde" :readonly="!editable" />
          </div>
          <div class="form-group">
            <label :for="'licHasta' + index">Vigencia hasta::</label>
            <input type="datetime-local" :id="'licHasta' + index" v-model="formattedLicHasta" :readonly="!editable" />
          </div>
          
          
          
          <div class="form-group">
            <label :for="'alcoholemia' + index">Resultado Test de Alcoholemia:</label>
            <input type="text" :id="'alcoholemia' + index" v-model="conductor.alcoholemia" :readonly="!editable" />
          </div>
          <div class="form-group">
            <label :for="'alcoholemiaHora' + index">Realizado:</label>
            <input type="datetime-local" :id="'alcoholemiaHora' + index" v-model="conductor.alcoholemiaHora" :readonly="!editable" />
          </div>
          <div class="form-group">
            <label :for="'vehiculoCorrespondeConductor' + index">Vehículo al que Correspondía:</label>
            <select :id="'vehiculoCorrespondeConductor' + index" v-model="conductor.vehiculoCorrespondeConductor" :readonly="!editable" >
              <option v-for="(vehiculo, placaIndex) in formulario.vehiculos" :key="placaIndex" :value="vehiculo.placa">
                {{ vehiculo.placa }}
              </option>
            </select>
          </div>
      </div>

      <!-- detalle -->
      <div class="subt">
        <h3><strong>4. Breve detalle del hecho</strong></h3>
      </div>      
      <div class="form-group">
        <label for="detalle">Detalle del Hecho:</label>
        <textarea id="detalle" v-model="formulario.detalle" maxlength="1000" :readonly="!editable" class="textarea1"></textarea>
      </div>

      <!-- victimas -->
      <div class="subt">
        <h3><strong>5. Víctimas del hecho</strong></h3>
      </div>
      <div v-if="editable" class="form-group">
        <button @click="agregarVictima">+ Añadir Víctima</button>
      </div>

      <div v-for="(victima, index) in formulario.victimas" :key="index">
        <h4>Víctima {{ index + 1 }}</h4>
        <div class="form-group">
          <label :for="'ci' + index">CI:</label>
          <input type="text" :id="'ci' + index" v-model="victima.ci" :readonly="!editable" />
          <button type="button" @click="confirmarBuscarVictima(index)" v-if="editable">Buscar</button>
        </div>
        <div class="form-group">
          <label :for="'nombre' + index">Nombre:</label>
          <input type="text" :id="'nombre' + index" v-model="victima.nombre" :readonly="!editable" />
        </div>
        <div class="form-group">
          <label :for="'edad' + index">Edad:</label>
          <input type="text" :id="'edad' + index" v-model="victima.edad" :readonly="!editable" />
        </div>
        <div class="form-group">
          <label :for="'domicilio' + index">Domicilio:</label>
          <input type="text" :id="'domicilio' + index" v-model="victima.domicilio" :readonly="!editable" />
        </div>
        <div class="form-group">
          <label :for="'fallecidoHerido' + index">Fallecido o Herido:</label>
          <select :id="'fallecidoHerido' + index" v-model="victima.fallecidoHerido" :readonly="!editable">
            <option value="fallecido">Fallecido</option>
            <option value="herido">Herido</option>
          </select>
        </div>
        <div class="form-group">
          <label :for="'tipoVictima' + index">Tipo de Víctima:</label>
          <select :id="'tipoVictima' + index" v-model="victima.tipoVictima" :readonly="!editable">
            <option value="peaton">Peatón</option>
            <option value="pasajero">Pasajero</option>
            <option value="conductor">Conductor</option>
          </select>
        </div>
        <div class="form-group">
          <label :for="'vehiculoCorrespondeVictima' + index">Vehículo al que Correspondía:</label>
          <select :id="'vehiculoCorrespondeVictima' + index" v-model="victima.vehiculoCorrespondeVictima" :readonly="!editable" >
            <option value="sinVehiculo">Sin Vehículo</option>
            <option v-for="(vehiculo, placaIndex) in formulario.vehiculos" :key="placaIndex" :value="vehiculo.placa">
              {{ vehiculo.placa }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label :for="'auxiliado' + index">Auxiliado:</label>
          <input type="text" :id="'auxiliado' + index" v-model="victima.auxiliado" :readonly="!editable" />
        </div>
      </div>

      <!-- fecha registro -->
      <div class="subt">
        <h3><strong>6. Fecha de Registro en el Sistema</strong></h3>
      </div>      
      <div class="form-group">
        <label :for="fechaRegistro">Fecha y Hora del Registro en el Sistema:</label>
        <input type="datetime-local" :id="fechaRegistro" v-model="formattedFechaRegistro" :readonly="!editable"/>
      </div>

      <!-- usuario que registra -->
      <div class="subt">
        <h3><strong>7. Usuario</strong></h3>
      </div>
      <div class="form-group">
        <label for="usuario">Usuario:</label>
        <input type="text" id="usuario" :value="formulario.usuario" :readonly="!editable">
      </div>

      <!-- comentarios adicionales -->
      <div class="subt">
        <h3><strong>8. Comentarios</strong></h3>
      </div>
      <div class="form-group">
        <label for="comentarios">Comentarios Adicionales (Opcional):</label>
        <textarea id="comentarios" v-model="formulario.comentarios" maxlength="1000" :readonly="!editable" class="textarea2"></textarea>
      </div>

      <!-- Botones de accion -->
      <div class="botones">
        <div v-if="!editable">
          <button @click="habilitarEdicion" v-if="!editable">Modificar Datos</button>
        </div>
        <div v-else>
          <button @click="emitirGuardarCambios" v-if="editable">Guardar Cambios</button>
        </div>
        <div>
          <button @click="generarReporte">Generar Reporte</button>
        </div>
        <div>
          <button @click="$emit('cerrarModal')">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import 'moment/locale/es'

export default {
  name: 'ModalFormulario',
  props: {
    formulario: {
      type: Object,
      required: true
    },
    formularioId: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      editable: false,
      vehiculosEncontrados: [],
      conductoresEncontrados: [],
      victimasEncontradas: []
    }
  },
  computed: {
    formattedFechaRegistro() {
      if (!this.formulario.fechaRegistro) return '';
      const date = new Date(this.formulario.fechaRegistro);
      return date.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:MM
    },
    formattedLicDesde() {
      if (!this.formulario.licDesde) return '';
      const date = new Date(this.formulario.licDesde);
      return date.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:MM
    },
    formattedLicHasta() {
      if (!this.formulario.licHasta) return '';
      const date = new Date(this.formulario.licHasta);
      return date.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:MM
    }
  },
  methods: {
    agregarVehiculo() {
      // Añadir un nuevo vehículo al array 'vehiculos'
      this.formulario.vehiculos.push({
        placa: '',
        marca: '',
        modelo: '',
        clase: '',
        color: '',
        empresa: '',
        tipoUso: ''
      });
    },
    agregarConductor() {
      // Añadir un nuevo vehículo al array 'vehiculos'
      this.formulario.conductores.push({
        ci: '',
        nombre: '',
        edad: '',
        domicilio: '',
        licencia: '',
        categoria: '',
        alcoholemia: '',
        alcoholemiaHora: '',
        vehiculoCorrespondeConductor: '',
        licDesde: '',
        licHasta: ''
      });
    },
    agregarVictima() {
      // Añadir un nuevo vehículo al array 'vehiculos'
      this.formulario.victimas.push({
        nombre: '',
        ci: '',
        edad: '',
        domicilio: '',
        fallecidoHerido: '',
        tipoVictima: '',
        vehiculoCorrespondeVictima: '',
        auxiliado: ''
      });
    },
    cerrarModal() {
      this.$emit('cerrar');
    },
    habilitarEdicion() {
      this.editable = true;
    },
    emitirGuardarCambios() {
      this.$emit('guardarCambios', this.formulario, this.formulario._id)
    },

    //logica para buscar vehiculo por placa
    async confirmarBuscarVehiculo(index) {
      const placa = this.formulario.vehiculos[index].placa;
      const confirmacion = confirm(`El dato de la placa a buscar es ${placa}, ¿Está seguro?`);
      if (confirmacion) {
        this.buscarVehiculo(index);
      }
    },

    async buscarVehiculo(index) {
      const vehiculo = this.formulario.vehiculos[index];
      const requestPayload = {
        contrasenia: 'd1u4EeXYnp8Xy5h2xWbTz4o0X8EfUhihOwF7Ejd9wrJYQNXkbzCVG7PU7AWndEMDJujblbUcQnO884pdlEMA==',
        usuario: 'MinGobDNFRServicio',
        token_key_MG: 'P7ehC5HPARluSshmhjb4rmfULceEqO0ku5QhT5iXs3YAMlEUiEbYd6CwQKKrb2RvoT4hHz1Hw6Pm8pRMbshjw==',
        placa: vehiculo.placa
      };
      try {
        console.log('Datos de la solicitud:', requestPayload);
        const response = await axios.post('https://srvweb.policiadnfr.gob.bo/api/ConsultaVehiculo/ServicioMinGob', requestPayload);
        console.log('Respuesta del servidor:', response);

        if (response.data && response.data.datos_vehiculo) {
          console.log('Datos del vehículo:', response.data.datos_vehiculo);

          // Eliminar la fotografía de los datos del vehículo porque es muy grande
          const datosVehiculo = response.data.datos_vehiculo;
          delete datosVehiculo.fotografia;

          const vehiculoExistente = this.vehiculosEncontrados.find(v => v.placa === vehiculo.placa);
          if (!vehiculoExistente) {
            this.formulario.vehiculos.splice(index, 1, datosVehiculo);
            this.vehiculosEncontrados.push(datosVehiculo);
          } else {
            alert('El vehículo ya ha sido agregado.');
          }
        } else {
          console.log('No se encontraron datos del vehículo');
        }
      } catch (error) {
        console.error('Error al buscar el vehículo:', error);
      }
    },

    // logica para encontrar conductor por ci
    confirmarBuscarConductor(index) {
        const ci = this.formulario.conductores[index].ci;
        const confirmacion = confirm(`El dato del CI a buscar es ${ci}, ¿Está seguro?`);
        if (confirmacion) {
          this.buscarConductor(index);
        }
      },
      async buscarConductor(index) {
        try {
          const ci = this.formulario.conductores[index].ci;
          if (!ci) {
            alert('CI del conductor es requerido')
            return;
          }
          const apiUrl = process.env.VUE_APP_API_URL
          const response = await axios.post(`${apiUrl}/segip_service`, {
            ced: ci,
            com: '',
            nom: '',
            pat: '',
            mat: '',
            fnac: ''
          }, {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZy1ycy0wIn0.eyJ1c2VyIjoic29hdCIsInNlcnZpY2UiOiJDZXJ0aWZpY2FkbyBkZSBBY2NpZGVudGVzIGRlIFRyw6Fuc2l0byBTT0FUIiwiaWF0IjoxNzE5NDA3NzI5LCJhdWQiOiJTZXJ2aWNpbyBkZSBJZGVudGlmaWNhY2lvbiBkZSBQZXJzb25hcyIsImlzcyI6Ik1pbmlzdGVyaW8gZGUgR29iaWVybm8ifQ.YmXEQ8LpgNQxsURar6wK6bumB0VJA4ZG6JtqDWjbaNoNGj5Qjs7LHBXeedjHb4BxFj6jgIlpp71r2cjFxlqfehnsVUqNLtqyCz6FmGsiImNJl_Gw-Ll_4Z86Dkjn0X3HGpsG69scUztEW4kC8U1LtlsUnJ7jb6O2cIblcmR1NUQ',
              'Content-Type': 'application/json'
            }
          });

          if (response.data) {
            // Asegúrate de ajustar la estructura del conductor según la respuesta
            const conductor = response.data
            this.formulario.conductores[index] = {
              ...this.formulario.conductores[index],
              nombre: `${conductor.Nombres} ${conductor.PrimerApellido} ${conductor.SegundoApellido}`,
              ci: conductor.NumeroDocumento,
              edad: this.calculateAge(conductor.FechaNacimiento),
              domicilio: conductor.Domicilio,
              licencia: '',  // Añade estos campos según sea necesario
              categoria: '',
              alcoholemia: '',
              alcoholemiaHora: '',
              vehiculoCorrespondeConductor: '',
              licDesde: '',
              licHasta: ''
            };
            //añadir el conductor a la lista
            this.conductoresEncontrados.push(this.formulario.conductores[index]);
          } else {
            this.$toast.error("No se encontraron datos del conductor")
            alert('Conductor no encontrado');
          }
        } catch (error) {
          console.error('Error al buscar conductor:', error);
          if (error.response && error.response.data && error.response.data.error) {
            alert('Error')
          } else {
            alert('Error al buscar conductor')
          }          
        }
      },

      // calcular edad
      calculateAge(fnac) {
        const parts = fnac.split('/');
        const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      },
      
      // logica para encontrar victima por ci
      confirmarBuscarVictima(index) {
        const ci = this.formulario.victimas[index].ci;
        const confirmacion = confirm(`El dato del CI a buscar es ${ci}, ¿Está seguro?`);
        if (confirmacion) {
          this.buscarVictima(index);
        }
      },
      async buscarVictima(index) {
        try {
          const ci = this.formulario.victimas[index].ci;
          if (!ci) {
            alert('CI de la víctima es requerido')
            return;
          }
          const apiUrl = process.env.VUE_APP_API_URL
          const response = await axios.post(`${apiUrl}/segip_service`, {
            ced: ci,
            com: '',
            nom: '',
            pat: '',
            mat: '',
            fnac: ''
          }, {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZy1ycy0wIn0.eyJ1c2VyIjoic29hdCIsInNlcnZpY2UiOiJDZXJ0aWZpY2FkbyBkZSBBY2NpZGVudGVzIGRlIFRyw6Fuc2l0byBTT0FUIiwiaWF0IjoxNzE5NDA3NzI5LCJhdWQiOiJTZXJ2aWNpbyBkZSBJZGVudGlmaWNhY2lvbiBkZSBQZXJzb25hcyIsImlzcyI6Ik1pbmlzdGVyaW8gZGUgR29iaWVybm8ifQ.YmXEQ8LpgNQxsURar6wK6bumB0VJA4ZG6JtqDWjbaNoNGj5Qjs7LHBXeedjHb4BxFj6jgIlpp71r2cjFxlqfehnsVUqNLtqyCz6FmGsiImNJl_Gw-Ll_4Z86Dkjn0X3HGpsG69scUztEW4kC8U1LtlsUnJ7jb6O2cIblcmR1NUQ',
              'Content-Type': 'application/json'
            }
          });

          if (response.data) {
            // Asegúrate de ajustar la estructura de la victima según la respuesta
            const victima = response.data
            this.formulario.victimas[index] = {
              ...this.formulario.victimas[index],
              nombre: `${victima.Nombres} ${victima.PrimerApellido} ${victima.SegundoApellido}`,
              ci: victima.NumeroDocumento,
              edad: this.calculateAge(victima.FechaNacimiento),
              domicilio: victima.Domicilio,
              fallecidoHerido: '',
              tipoVictima: '',
              vehiculoCorrespondeVictima: 'Sin Vehículo',
              auxiliado: ''
            };
            //añadir la victima a la lista
            this.victimasEncontradas.push(this.formulario.victimas[index]);
          } else {
            this.$toast.error("No se encontraron datos de la víctima")
            alert('Víctima no encontrada');
          }
        } catch (error) {
          console.error('Error al buscar víctima:', error);
          if (error.response && error.response.data && error.response.data.error) {
            alert('Error')
          } else {
            alert('Error al buscar víctima')
          }          
        }
      },

      // calcular edad
      calculateAge(fnac) {
        const parts = fnac.split('/');
        const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      },

    //generar reporte con jsreport
    async generarReporte() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL
        const response = await axios.get(`${apiUrl}/accidentes/reporte/${this.formularioId}`, {
        //   template: {
        //     shortid: 'kq2nv7UyxU' // Reemplaza con el shortid de tu template en jsreport
        //   },
        //   data: this.formulario,
        // }, {
          responseType: 'blob'
        });

        // Crear un enlace temporal para la descarga del archivo PDF
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Caso N° ${this.formulario.hechos[0].casoNumero}.pdf`);
        document.body.appendChild(link);
        link.click();
        
        // Limpiar el enlace después de la descarga
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error generando el reporte:', error);
      }
    },
  }
};
</script>

<style scoped>
.input {
  text-transform: uppercase;
}
.modal-overlay {
  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  z-index: 9999;
  font-family: system-ui;
}

.modal-content {
  background-color: rgb(107, 141, 104);
  padding: 1em 5em 1em 1em;
  width: 80%;
  max-width: 150vh;
  max-height: 90vh;
  overflow-y: auto; 
  border-radius: 1em;
  box-shadow: 0 0 0.8em rgba(255, 255, 255, 0.473);
  position: relative;
  font-size: 18px;
  text-transform: uppercase;
}

.modal-content h1 {
  text-align: center;
  margin-top: 1em;
  margin-bottom: 1em;
  text-transform: uppercase;
}
.modal-content h3 {
  margin-top: 1em;
  text-transform: uppercase;
}
.modal-content > div {
  margin-bottom: 1em;
  text-transform: uppercase;
}
.modal-content label {
  display: block;
  margin-bottom: 0;
  text-transform: uppercase;
}
.modal-content input[type="text"],
.modal-content input[type="datetime-local"],
.modal-content select,
.modal-content textarea {
  width: 100%;
  padding: 1em;
  /* margin-top: 0;
  margin-bottom: 0; */
  box-sizing: border-box;
  border: 0.1em solid #043d02;
  border-radius: 0.5cm;
  font-size: 14px;
  text-transform: uppercase;
}
.modal-content button {
  padding: 1.5em 2em 1.5em 2em;
  background-color: #003303;
  color: white;
  border: none;
  border-radius: 1em;
  cursor: pointer;
  margin-top: 2em;
  text-transform: uppercase;
}
.modal-content button:hover {
  background-color: #8fdb85;
}
.modal-content button:last-child {
  margin-left: 3em;
}
.modal-content::-webkit-scrollbar {
  width: 0.4em;
}
.modal-content::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 0.4em;
}
.modal-content::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
.modal-content::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 0.4em;
}

.textarea1 {
  width: auto;
  height: 25em;
  resize: none;
}
.textarea2 {
  width: auto;
  height: 5em;
  resize: none;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-group label {
  flex: 1;
  margin-right: 10px;
  text-align: right;
}

.form-group input, .form-group select, .form-group textarea {
  flex: 2;
}

.botones {
  display:flex;
  justify-content: center;
  align-items: center;
}

.subt {
  text-align: left;
  padding-left: 3em;
}
</style>