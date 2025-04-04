<script setup>
import Header from "./components/Header.vue";
import Formulario from "./components/Formulario.vue";
import Paciente from './components/Paciente.vue';
import { reactive, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const pacientes = ref([]);
const paciente = reactive({
  id: '',
  nombre: '',
  propietario: '',
  email: '',
  alta: '',
  sintomas: '',
});

const guardarPaciente = () => {
  pacientes.value.push({
    ...paciente,
    id: uuidv4(),
  });

  Object.keys(paciente).forEach((key) => {
    paciente[key] = '';
  });
}

</script>
<template>
  <div class="container mx-auto mt-20">
    <Header />
    <div class="mt-12 md:flex">
      <Formulario
        v-model:nombre="paciente.nombre"
        v-model:propietario="paciente.propietario"
        v-model:email="paciente.email"
        v-model:alta="paciente.alta"
        v-model:sintomas="paciente.sintomas"
        @guardar-paciente="guardarPaciente"
      />
      <div class="md:w-1/2 md:h-screen">
        <h3 class="font-black text-3xl text-center">Administra tus pacientes</h3>
        <div v-if="pacientes.length > 0">
          <p class="text-lg mt-5 text-center mb-10">
            Información de
            <span class="text-indigo-600 font-bold">Pacientes</span>
          </p>
          <Paciente v-for="data in pacientes" :paciente="data" :key="data.id"/>
        </div>
        <div v-else class="mt-20 text-2xl text-center">
          No hay pacientes
        </div>
      </div>
    </div>

    <notifications />
  </div>
</template>