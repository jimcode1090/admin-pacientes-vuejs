import { notify } from '@kyvg/vue3-notification';

export const toastError = (message) => {
  notify({
    title: 'Error',
    text: message,
    type: 'error',
    duration: 1000,
  });
};

export const toastSuccess = (message) => {
  notify({
    title: 'Éxito',
    text: message,
    type: 'success',
    duration: 3000,
  });
};
