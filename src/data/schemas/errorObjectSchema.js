export const errorSchema = {
  $id: '/schemas/error',
  type: 'object',
  properties: {
    field: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['field', 'message'],
  additionalProperties: false,
};

export const errorArraySchema = {
  $id: '/schemas/errors',
  type: 'array',
  items: {
    $ref: '/schemas/error',
  },
};
