import * as yup from 'yup';

export const bookSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required().min(3).max(10),
  age: yup.number().required(),
});
