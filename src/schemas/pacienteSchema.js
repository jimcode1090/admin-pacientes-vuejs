import * as yup from 'yup';

export const pacienteSchema = yup.object({
  nombre: yup.string().required('El nombre de la mascota es obligatorio'),
  propietario: yup.string().required('El nombre del propietario es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  alta: yup
    .date()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .required('La fecha de alta es obligatoria'),
  sintomas: yup.string().required('Los síntomas son obligatorios'),
});
