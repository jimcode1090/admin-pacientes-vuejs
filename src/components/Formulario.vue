<script setup>
  import { reactive } from 'vue';
  import { ExclamationCircleIcon } from '@heroicons/vue/24/solid';
  import { pacienteSchema } from '../schemas/pacienteSchema.js';
  import Alerta from './Alerta.vue';
  import InputField from './InputField.vue';

  const emit = defineEmits([
    'update:nombre',
    'update:propietario',
    'update:email',
    'update:alta',
    'update:sintomas',
    'guardar-paciente',
  ]);

  const props = defineProps({
    nombre: {
      type: String,
      required: true,
    },
    propietario: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    alta: {
      type: String,
      required: true,
    },
    sintomas: {
      type: String,
      required: true,
    },
  });

  const errores = reactive({});
  const alerta = reactive({
    tipo: '',
    mensaje: '',
  });

  const handleSubmit = async () => {
    Object.keys(errores).forEach((key) => delete errores[key]);

    try {
      await pacienteSchema.validate(props, { abortEarly: false });
      emit('guardar-paciente');
    } catch (err) {
      if (err.inner) {
        alerta.tipo = 'error';
        alerta.mensaje = 'Todos los campos son obligatorios';
        Array.from(err.inner)
          .slice()
          .reverse()
          .forEach((e) => {
            errores[e.path] = e.message;
          });
      }
    }

  };
</script>
<template>
  <div class="md:w-1/2">
    <h2 class="font-black text-3xl text-center">Seguimiento pacientes</h2>
    <p class="text-lg mt-5 text-center mb-10">
      Añade tus pacientes y
      <span class="text-indigo-600 font-bold">Administralos</span>
    </p>
    <Alerta v-if="alerta.mensaje" :alerta="alerta" />
    <form
      @submit.prevent="handleSubmit"
      action=""
      class="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
    >
      <InputField
        @input="$emit('update:nombre', $event.target.value)"
        id="mascota"
        name="mascota"
        label="Nombre de la mascota"
        placeholder="Ingrese el nombre de la mascota"
        :error="errores.nombre"
        :model-value="nombre"
      />

      <InputField
        @input="$emit('update:propietario', $event.target.value)"
        id="propietario"
        name="propietario"
        label="Nombre del propietario"
        placeholder="Ingrese el nombre del propietario"
        :error="errores.propietario"
        :model-value="propietario"
      />

      <InputField
        @input="$emit('update:email', $event.target.value)"
        id="email"
        name="email"
        label="Email de Contacto"
        placeholder="Ingrese el correo de contacto"
        :error="errores.email"
        type="email"
        :model-value="email"
      />


      <InputField
        @input="$emit('update:alta', $event.target.value)"
        id="mascota"
        name="mascota"
        label="Fecha de Alta"
        type="date"
        :error="errores.alta"
        :model-value="alta"
      />

      <div class="mb-5 relative">
        <label for="sintomas" class="block text-gray-700 uppercase font-bold">
          Síntomas
        </label>
        <textarea
          @input="$emit('update:sintomas', $event.target.value)"
          :class="[
            'border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md',
            errores.sintomas ? 'border-1 border-red-500' : 'border',
          ]"
          id="sintomas"
          cols="30"
          rows="5"
          placeholder="Escriba los sintomas"
          :value="sintomas"
        ></textarea>
        <ExclamationCircleIcon
          v-if="errores.sintomas"
          class="w-5 h-5 text-red-500 absolute right-3 top-10"
        />
        <p v-if="errores.sintomas" class="text-red-500 mt-1 italic text-sm">{{ errores.sintomas }}</p>
      </div>

      <input
        type="submit"
        class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-900 transition-colors cursor-pointer"
        value="Registrar paciente"
      />
    </form>
  </div>
</template>

