import { faker } from '@faker-js/faker';
import { gender, status } from '../data/sharedData';
import ApiClient from '../api/client';
import isValidJsonSchema from '../utils/responseSchemaValidator';

const client = ApiClient.authorized();
const unauthClient = ApiClient.unauthorized();

describe('create a new User', () => {
  const user = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };
  let userId;
  let response;

  beforeAll(async () => {
    response = await client.user.addUser(user);
    userId = response.data.id;
  });

  it('response status code should be 200', async () => {
    expect(response.status).toBe(201);
  });

  it('response should contain correct User data', async () => {
    expect(response.data.name).toBe(user.name);
    expect(response.data.email).toBe(user.email);
    expect(response.data.gender).toBe(user.gender);
    expect(response.data.status).toBe(user.status);
  });

  it('response should have valid schema', async () => {
    expect(isValidJsonSchema(response.data, '/schemas/user')).toBe(true);
  });

  it('get created User by id and verify data', async () => {
    const getResponse = await client.user.getUser(userId);
    expect(getResponse.status).toBe(200);
    expect(getResponse.data.id).toBe(userId);
    expect(getResponse.data.name).toBe(user.name);
    expect(getResponse.data.email).toBe(user.email);
    expect(getResponse.data.gender).toBe(user.gender);
    expect(getResponse.data.status).toBe(user.status);
  });

  it('authorization isn\'t required to get User by id', async () => {
    const getResponse = await unauthClient.user.getUser(userId);
    expect(getResponse.status).toBe(200);
    expect(getResponse.data.id).toBe(userId);
    expect(getResponse.data.name).toBe(user.name);
    expect(getResponse.data.email).toBe(user.email);
    expect(getResponse.data.gender).toBe(user.gender);
    expect(getResponse.data.status).toBe(user.status);
  });

  afterAll(async () => {
    try {
      await client.user.deletetUser(userId);
    } catch (err) {
      console.log(`Unable to delete User - ${userId}`);
    }
  });
});
