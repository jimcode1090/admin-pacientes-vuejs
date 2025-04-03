<script setup>
  import { computed } from 'vue';
  import { ExclamationCircleIcon } from '@heroicons/vue/24/solid/index.js';

  const props = defineProps({
    modelValue: String,
    label: String,
    name: String,
    id: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    error: String,
  });

  const emit = defineEmits(['update:modelValue']);

  const inputClass = computed(() => {
    return [
      'w-full p-2 mt-2 placeholder-gray-400 rounded-md pr-10',
      props.error ? 'border-1 border-red-500' : 'border border-gray-300',
    ];
  });

</script>
<template>
  <div class="mb-5 relative">
    <label :for="id" class="block text-gray-700 uppercase font-bold">
      {{ label }}
    </label>
    <input
      :type="type"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      :class="inputClass"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <ExclamationCircleIcon
      v-if="error"
      class="w-5 h-5 text-red-500 absolute right-3 top-10"
    />
    <p v-if="error" class="text-red-500 mt-1 italic text-sm">{{ error }}</p>
  </div>
</template>
