<template>

<div class="formulario">
    <div class="form-container">
      <h1>CERTIFICADO DE ACCIDENTES DE TRÁNSITO - SOAT</h1>
      <form @submit.prevent="submitFormulario">

        <h3>EL JEFE DE LA DIVISIÓN DE ACCIDENTES DE LA DIRECCIÓN DEPARTAMENTAL DE TRÁNSITO DE LA CIUDAD DE LA PAZ, EN CUANTO PUEDE Y EL DERECHO LE PERMITE:</h3>
        <h2>CERTIFICA:</h2>

        <!-- hechos -->
        <p><strong>1. Datos del Hecho de Tránsito</strong></p>
        <div>
          <div>
            <label for="denunciante">Denunciante:</label>
            <input type="text" id="denunciante" v-model="formulario.hechos.denunciante" maxlength="500" class="input" autocomplete="off" />
          </div>
          <div>
            <label for="casoNumero">Caso N°:</label>
            <input type="text" id="casoNumero" v-model="formulario.hechos.casoNumero" class="input" autocomplete="off" placeholder="Mínimo 10 caracteres" />
          </div>
          <div>
            <label for="naturaleza">Naturaleza del Hecho:</label>
            <input type="text" id="naturaleza" v-model="formulario.hechos.naturaleza" maxlength="500" class="input" autocomplete="off" />
          </div>
          <div>
              <label for="departamento">Departamento:</label>
              <select id="departamento" v-model="formulario.hechos.departamento" maxlength="50" class="input" autocomplete="off" >
                <option value="La Paz">La Paz</option>
                <option value="Cochabamba">Cochabamba</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Oruro">Oruro</option>
                <option value="Potosi">Potosí</option>
                <option value="Tarija">Tarija</option>
                <option value="Beni">Beni</option>
                <option value="Pando">Pando</option>
                <option value="Chuquisaca">Chuquisaca</option>
              </select>
            </div>
          <div>
            <label for="estacionPolicial">Estación Policial:</label>
            <input type="text" id="estacionPolicial" v-model="formulario.hechos.estacionPolicial" maxlength="500" class="input" autocomplete="off" />
          </div>
          <div>
            <label for="lugar">Lugar del Hecho:</label>
            <input type="text" id="lugar" v-model="formulario.hechos.lugar" maxlength="500" class="input" autocomplete="off" />
          </div>
          <div>
            <label for="diaHoraFecha">Día, Hora y Fecha del Hecho:</label>
            <input type="datetime-local" id="diaHoraFecha" v-model="formulario.hechos.diaHoraFecha" class="input" autocomplete="off" />
          </div>
        </div>

        <!-- vehiculos -->
        <div>
          <p><strong>2. Datos de los Vehículos</strong></p>
        </div>
        
        <div v-for="(vehiculo, index) in formulario.vehiculos" :key="index">
          <label :for="'vehiculo' + index">Placa del Vehículo {{ index + 1 }}:</label>
          <input :id="'vehiculo' + index" v-model="vehiculo.placa" class="input" autocomplete="off" />
          <button type="button" @click="confirmarBuscarVehiculo(index)">Buscar</button>
        </div>
        
        <div v-if="vehiculosEncontrados.length > 0">
        
          <h3>Vehículos:</h3>
          
          <div v-for="(vehiculo, index) in vehiculosEncontrados" :key="index" class="input">
            <h3>Vehículo {{ index + 1 }}:</h3>
            <p>Placa: {{ vehiculo.placa }}</p>
            <p>Marca: {{ vehiculo.marca }}</p>
            <p>Modelo: {{ vehiculo.modelo }}</p>
            <p>Tipo Vehículo: {{ vehiculo.clase }}</p>
            <p>Color: {{ vehiculo.color }}</p>
            <label for="empresa">Empresa o Institución a la que pertenece el vehículo:</label>
              <input type="text" id="empresa" v-model="formulario.vehiculos[index].empresa"  class="input" autocomplete="off" />
            <label for="tipoUso">Tipo de servicio:</label>
              <select :id="'tipoUso' + index" v-model="formulario.vehiculos[index].tipoUso" class="input" autocomplete="off" >
                <option value="Particular">Particular</option>
                <option value="Público">Público</option>
              </select>
          </div>
          <button type="button" @click="agregarVehiculo">+ Registrar otro vehículo</button>
        </div>

        <!-- conductores -->
        <div>
          <p><strong>3. Datos de los Conductores</strong></p>
        </div>
        <div v-for="(conductor, index) in formulario.conductores" :key="index">
          <label :for="'conductor' + index">CI del Conductor {{ index + 1 }}:</label>
            <input :id="'conductor' + index" v-model.number="conductor.ci" class="input" autocomplete="off" />
          <button type="button" @click="confirmarBuscarConductor(index)">Buscar</button>
        </div>
        <div v-if="conductoresEncontrados.length > 0">
          <h3>Conductores:</h3>
          <div v-for="(conductor, index) in conductoresEncontrados" :key="index" class="input">
            <h3>Conductor {{ index + 1 }}:</h3>
            <p>Nombre: {{ conductor.nombre }}</p>
            <p>CI: {{ conductor.ci }}</p>
            <p>Edad: {{ conductor.edad }}</p>
            <p>Domicilio: {{ conductor.domicilio }}</p>
            <!-- <div> -->
              <label :for="'licencia' + index">Licencia de Conducir N°:</label>
              <input type="text" :id="'licencia' + index" v-model="formulario.conductores[index].licencia" class="input" autocomplete="off" />
            <!-- </div> -->
            <!-- <div> -->
              <label :for="'categoria' + index">Categoría:</label>
              <select :id="'categoria' + index" v-model="formulario.conductores[index].categoria" class="input">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="P">P</option>
                <option value="M">M</option>
              </select>
            <!-- </div> -->
            <!-- <div v-for="(conductor, index) in formulario.conductores" :key="index"> -->
              <!-- <div> -->
                <label :for="'licDesde' + index">Licencia de Conducir con Vigencia desde:</label>
                <input type="date" :id="'licDesde' + index" v-model="conductor.licDesde" class="input" autocomplete="off" />
              <!-- </div> -->
              <!-- <div> -->
                <label :for="'licHasta' + index">Licencia de Conducir con Vigencia hasta:</label>
                <input type="date" :id="'licHasta' + index" v-model="conductor.licHasta" class="input" autocomplete="off" />
              <!-- </div> -->
            <!-- </div> -->
              <!-- <div> -->
                <label :for="'alcoholemia' + index">Resultado Test de Alcoholemia:</label>
                <input type="text" :id="'alcoholemia' + index" v-model="formulario.conductores[index].alcoholemia" maxlength="500" class="input" autocomplete="off" />
              <!-- </div> -->
              <!-- <div> -->
                <label :for="'alcoholemiaHora' + index">Realizado:</label>
                <input type="datetime-local" :id="'alcoholemiaHora' + index" v-model="formulario.conductores[index].alcoholemiaHora" class="input" autocomplete="off" />
              <!-- </div> -->
              <!-- <div> -->
                <label :for="'vehiculoCorrespondeConductor' + index">Vehículo al que Correspondía:</label>
                <select :id="'vehiculoCorrespondeConductor' + index" v-model="formulario.conductores[index].vehiculoCorrespondeConductor" class="input">
                  <option v-for="(vehiculo, placaIndex) in formulario.vehiculos" :key="placaIndex" :value="vehiculo.placa">
                    {{ vehiculo.placa }}
                  </option>
                </select>
              <!-- </div> -->
          </div>
          <button type="button" @click="agregarConductor">+ Agregar Conductor</button>
        </div>


        <!-- detalle -->
        <p><strong>4. Breve detalle del hecho</strong></p>
        <div>
          <label for="detalle">Detalle del Hecho:</label>
          <textarea id="detalle" v-model="formulario.detalle" maxlength="5000" class="textarea"></textarea>
        </div>

        <!-- victimas -->
        <div>
          <p><strong>5. Víctimas del hecho</strong></p>
        </div>
        <div v-for="(victima, index) in formulario.victimas" :key="index">
          <label :for="'victima' + index">CI de la Víctima {{ index + 1 }}:</label>
          <input :id="'victima' + index" v-model="victima.ci" class="input" autocomplete="off" />
          <button type="button" @click="confirmarBuscarVictima(index)">Buscar</button>
        </div>
        <div v-if="victimasEncontradas.length > 0">
          <h3>Víctimas:</h3>
          <div v-for="(victima, index) in victimasEncontradas" :key="index" class="input">
            <h3>Víctima {{ index + 1 }}:</h3>
            <p>Nombre: {{ victima.nombre }}</p>
            <p>CI: {{ victima.ci }}</p>
            <p>Edad: {{ victima.edad }}</p>
            <p>Domicilio: {{ victima.domicilio }}</p>
            <!-- <div> -->
              <label :for="'fallecidoHerido' + index">Fallecido o Herido:</label>
              <select :id="'fallecidoHerido' + index" v-model="victima.fallecidoHerido" class="input">
                <option value="Fallecido">Fallecido</option>
                <option value="Herido">Herido</option>
              </select>
            <!-- </div> -->
            <!-- <div> -->
              <label :for="'tipoVictima' + index">Tipo de Víctima:</label>
              <select :id="'tipoVictima' + index" v-model="victima.tipoVictima" class="input">
                <option value="Peatón">Peatón</option>
                <option value="Pasajero">Pasajero</option>
                <option value="Conductor">Conductor</option>
              </select>
            <!-- </div> -->
            <!-- <div> -->
              <label :for="'vehiculoCorrespondeVictima' + index">Vehículo al que Correspondía:</label>
              <select :id="'vehiculoCorrespondeVictima' + index" v-model="victima.vehiculoCorrespondeVictima" class="input">
                <option value="Sin Vehiculo">Sin Vehículo</option>
                <option v-for="(vehiculo, placaIndex) in formulario.vehiculos" :key="placaIndex" :value="vehiculo.placa">
                  {{ vehiculo.placa }}
                </option>
              </select>
            <!-- </div> -->
            <!-- <div> -->
              <label :for="'auxiliado' + index">Auxiliado a:</label>
              <input type="text" :id="'auxiliado' + index" v-model="victima.auxiliado" class="input" autocomplete="off" />
            </div>
            <button type="button" @click="agregarVictima">+ Agregar Víctima</button>
          <!-- </div> -->
        </div>

        <!-- fecha registro -->
        <div>
          <label for="fechaRegistro">Fecha y Hora del Registro en el Sistema:</label>
          <input type="datetime-local" id="fechaRegistro" v-model="formulario.fechaRegistro" class="input" autocomplete="off" />
        </div>

        <!-- usuario que registra -->
        <div>
          <label for="usuario">Usuario:</label>
          <input type="text" id="usuario" :value="usuario" readonly class="input" autocomplete="off">
        </div>

        <!-- comentarios adicionales -->
        <p><strong>6. Observaciones</strong></p>
        <div>
          <label for="comentarios">Comentarios Adicionales (Opcional):</label>
          <input type="text" id="comentarios" v-model="formulario.comentarios" maxlength="1000" class="input" />          
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Formulario',
  props: {
    userData: Object
  },
  data() {
    return {
      // pasoActual: 1,
      formulario: {
        hechos: {
          denunciante: '',
          casoNumero: '',
          naturaleza: '',
          lugar: '',
          diaHoraFecha: '',
          departamento: '',
          estacionPolicial: '',
          relato: '',
        },
        vehiculos: [{
          placa: '',
          marca: '',
          modelo: '',
          clase: '',
          color: '',
          empresa: '',
          tipoUso: ''
        }],
        conductores: [{
          ci: '',
          // complemento: '',
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
        }],
        detalle: '',
        victimas: [{
          nombre: '',
          ci: '',
          // complemento: '',
          edad: '',
          domicilio: '',
          fallecidoHerido: '',
          tipoVictima: '',
          vehiculoCorrespondeVictima: '',
          auxiliado: ''
        }],
        fechaRegistro: '',
        usuario: '',
        comentarios: '',
      },
      usuario: `${this.userData.grado} ${this.userData.nombre} ${this.userData.apellidos}`,
      vehiculosEncontrados: [],
      conductoresEncontrados: [],
      victimasEncontradas: []
    };
  },
  mounted(){
    const resp = JSON.parse(localStorage.getItem('userData'));
    this.formulario.usuario =` ${resp.grado} ${resp.nombre} ${resp.apellidos}`
  },
  computed:{
    actualDate(){
      return new Date().toISOString().slice(0, 16);
    }
  },
  methods: {
    async submitFormulario() {
      const confirmacion = confirm("¿Está seguro de los datos ingresados? Éstos no se pueden modificar más adelante.")
      if (!confirmacion) return

      const formData = {
        hechos: this.formulario.hechos,
        vehiculos:this.formulario.vehiculos,
        conductores: this.formulario.conductores,
        detalle: this.formulario.detalle,
        victimas: this.formulario.victimas,
        usuario: this.usuario,
        fechaRegistro: this.formulario.fechaRegistro,
        comentarios: this.formulario.comentarios,
      }
      console.log(this.formulario);
      console.log("Datos enviados: ", formData);
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/accidentes', this.formulario)
        // const response = await axios.post('http://127.0.0.1:5000/api/accidentes', formData)
        console.log("response", response)
        alert('Formulario enviado exitosamente');
        this.$router.push('/hechos')
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Error al enviar el formulario. Revisa la consola para más detalles.');
      }
    },

    // logica para buscar vehiculo por placa
    confirmarBuscarVehiculo(index) {
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
        const response = await axios.post('https://srvweb.policiadnfr.gob.bo/api/ConsultaVehiculo/ServicioMinGob', requestPayload);
        if (response.data && response.data.datos_vehiculo) {
          // eliminar la foto
          const datosVehiculo = response.data.datos_vehiculo
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
    agregarVehiculo() {
      this.formulario.vehiculos.push({ placa: '' });
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
        const response = await axios.post('http://localhost:5000/segip_service', {
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
          const conductor = response.data
          this.formulario.conductores[index] = {
            ...this.formulario.conductores[index],
            nombre: `${conductor.Nombres} ${conductor.PrimerApellido} ${conductor.SegundoApellido}`,
            ci: conductor.NumeroDocumento,
            edad: this.calculateAge(conductor.FechaNacimiento),
            domicilio: conductor.Domicilio,
            licencia: conductor.NumeroDocumento,
            categoria: '',
            alcoholemia: '',
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
    agregarConductor() {
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
        licHasta:''
      });
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
        const response = await axios.post('http://localhost:5000/segip_service', {
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
          const victima = response.data
          this.formulario.victimas[index] = {
            ...this.formulario.victimas[index],
            nombre: `${victima.Nombres} ${victima.PrimerApellido} ${victima.SegundoApellido}`,
            ci: victima.NumeroDocumento,
            com: '',
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
    agregarVictima() {
      this.formulario.victimas.push({
        nombre: '',
        ci: '',
        com: '',
        edad: '',
        domicilio: '',
        fallecidoHerido: '',
        tipoVictima: '',
        vehiculoCorrespondeVictima: '',
        auxiliado: '',
      });
    },
  }
}
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
}
.input {
  text-transform: uppercase;
}
.formulario {
  background-color: rgba(107, 141, 104, 0.527);
}
.form-container {
  font-family: system-ui;
  max-width: 100em;
  margin: auto;
  padding: 20px;
  border: 0.15cm solid rgb(107, 141, 104);
  border-radius: 0.5cm;
  background-color: #f9f9f9;
  color: #2c3e50;

  background-image: url('../assets/douglaslogo2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

h1 {
  color: #2c3e50;
  text-align: center;
  text-decoration: underline;
}
h3 {
  color: rgb(1, 85, 15);
}
label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}
input[type="text"],
input[type="datetime-local"],
textarea,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button[type="submit"] {
  background-color: rgb(1, 85, 15);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}
button[type="submit"]:hover {
  background-color: rgb(107, 141, 104);
}
button[type="button"] {
  background-color: rgb(1, 85, 15);
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}
button[type="button"]:hover {
  background-color: rgb(107, 141, 104);
}
.input {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  color: #333;
  padding: 0.5rem;
}
.textarea {
  width: 100%;
  height: 150px;
  resize: none;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  color: #333;
  padding: 0.5rem;
}
</style>