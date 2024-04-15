import { gender, status } from '../sharedData';

export const userSchema = {
  $id: '/schemas/user',
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    gender: { type: 'string', enum: gender },
    status: { type: 'string', enum: status },
  },
  required: ['id', 'name', 'email', 'gender', 'status'],
  additionalProperties: false,
};

export const userArraySchema = {
  $id: '/schemas/users',
  type: 'array',
  items: {
    $ref: '/schemas/user',
  },
};
