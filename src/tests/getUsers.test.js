import ApiClient from '../api/client';
import isValidJsonSchema from '../utils/responseSchemaValidator';

const client = ApiClient.authorized();
const unauthClient = ApiClient.unauthorized();

describe('get all Users', () => {
  let response;

  beforeAll(async () => {
    response = await client.user.getUsers();
  });

  it('response status code should be 200', async () => {
    expect(response.status).toBe(200);
  });

  it('response should have valid schema', async () => {
    expect(isValidJsonSchema(response.data, '/schemas/users')).toBe(true);
  });
});

describe('authorization isn\'t required to get all Users', () => {
  let response;

  beforeAll(async () => {
    response = await unauthClient.user.getUsers();
  });

  it('response status code should be 200', async () => {
    expect(response.status).toBe(200);
  });

  it('response should have valid schema', async () => {
    expect(isValidJsonSchema(response.data, '/schemas/users')).toBe(true);
  });
});
