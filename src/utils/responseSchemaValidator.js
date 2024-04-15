import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { userSchema, userArraySchema } from '../data/schemas/userSchema';
import { errorSchema, errorArraySchema } from '../data/schemas/errorObjectSchema';

export default function isValidJsonSchema(data, schema) {
  const ajv = new Ajv({
    schemas: [
      userSchema,
      userArraySchema,
      errorSchema,
      errorArraySchema,
    ],
    allowUnionTypes: true,
  });
  addFormats(ajv);
  const valid = ajv.validate(schema, data);
  if (!valid) {
    console.log(ajv.errors);
    return valid;
  }
  return valid;
}
