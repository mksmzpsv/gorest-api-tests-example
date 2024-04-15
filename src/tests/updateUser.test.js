import { faker } from '@faker-js/faker';
import { gender, status } from '../data/sharedData';
import ApiClient from '../api/client';
import isValidJsonSchema from '../utils/responseSchemaValidator';

const client = ApiClient.authorized();

describe('update User (PUT)', () => {
  const user = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };
  const userUpd = {
    name: faker.person.fullName({ lastName: 'AutotestUpd' }),
    email: faker.internet.email({ provider: 'autotestupd.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };
  let userId;
  let response;

  beforeAll(async () => {
    const createResponse = await client.user.addUser(user);
    userId = createResponse.data.id;
    response = await client.user.updateUser(userId, userUpd);
  });

  it('response status code should be 200', async () => {
    expect(response.status).toBe(200);
  });

  it('response should have valid schema', async () => {
    expect(isValidJsonSchema(response.data, '/schemas/user')).toBe(true);
  });

  it('response should contain correct User data', async () => {
    expect(response.data.name).toBe(userUpd.name);
    expect(response.data.email).toBe(userUpd.email);
    expect(response.data.gender).toBe(userUpd.gender);
    expect(response.data.status).toBe(userUpd.status);
  });

  it('get updated User by id and verify data', async () => {
    const getResponse = await client.user.getUser(userId);
    expect(getResponse.status).toBe(200);
    expect(getResponse.data.id).toBe(userId);
    expect(getResponse.data.name).toBe(userUpd.name);
    expect(getResponse.data.email).toBe(userUpd.email);
    expect(getResponse.data.gender).toBe(userUpd.gender);
    expect(getResponse.data.status).toBe(userUpd.status);
  });

  afterAll(async () => {
    try {
      await client.user.deletetUser(userId);
    } catch (err) {
      console.log(`Unable to delete user - ${userId}`);
    }
  });
});

describe('update User (PATCH)', () => {
  const user = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };
  const userUpd = {
    name: faker.person.fullName({ lastName: 'AutotestUpd' }),
    email: faker.internet.email({ provider: 'autotestupd.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };
  let userId;
  let response;

  beforeAll(async () => {
    const createResponse = await client.user.addUser(user);
    userId = createResponse.data.id;
    response = await client.user.updateUser(userId, userUpd, 'PATCH');
  });

  it('response status code should be 200', async () => {
    expect(response.status).toBe(200);
  });

  it('response should have valid schema', async () => {
    expect(isValidJsonSchema(response.data, '/schemas/user')).toBe(true);
  });

  it('response should contain correct User data', async () => {
    expect(response.data.name).toBe(userUpd.name);
    expect(response.data.email).toBe(userUpd.email);
    expect(response.data.gender).toBe(userUpd.gender);
    expect(response.data.status).toBe(userUpd.status);
  });

  it('get updated User by id and verify data', async () => {
    const getResponse = await client.user.getUser(userId);
    expect(getResponse.status).toBe(200);
    expect(getResponse.data.id).toBe(userId);
    expect(getResponse.data.name).toBe(userUpd.name);
    expect(getResponse.data.email).toBe(userUpd.email);
    expect(getResponse.data.gender).toBe(userUpd.gender);
    expect(getResponse.data.status).toBe(userUpd.status);
  });

  afterAll(async () => {
    try {
      await client.user.deletetUser(userId);
    } catch (err) {
      console.log(`Unable to delete user - ${userId}`);
    }
  });
});
