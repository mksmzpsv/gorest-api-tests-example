import { faker } from '@faker-js/faker';
import { gender, status } from '../data/sharedData';
import ApiClient from '../api/client';

const client = ApiClient.authorized();
const unauthClient = ApiClient.unauthorized();

describe('delete User', () => {
  const user = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };
  let userId;
  let response;

  beforeAll(async () => {
    const createResponse = await client.user.addUser(user);
    userId = createResponse.data.id;
    expect(createResponse.status).toBe(201);
    response = await client.user.deletetUser(userId);
  });

  it('response status code should be 204', async () => {
    expect(response.status).toBe(204);
  });

  it('User shouldn\'t be available after deletion', async () => {
    const getResponse = await client.user.getUser(userId);
    expect(getResponse.status).toBe(404);
    expect(getResponse.data.message).toBe('Resource not found');
  });
});

describe('authorization is required to delete User', () => {
  let response;

  beforeAll(async () => {
    const userId = (await unauthClient.user.getUsers()).data[0].id;
    response = await unauthClient.user.deletetUser(userId);
  });

  it('response status code should be 401', async () => {
    expect(response.status).toBe(401);
  });

  it('error object in response should have correct data', async () => {
    expect(response.data.message).toBe('Authentication failed');
  });
});
