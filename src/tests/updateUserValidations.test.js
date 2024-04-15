import { faker } from '@faker-js/faker';
import { gender, status } from '../data/sharedData';
import ApiClient from '../api/client';
import isValidJsonSchema from '../utils/responseSchemaValidator';

const client = ApiClient.authorized();
const unauthClient = ApiClient.unauthorized();

let userId;

beforeAll(async () => {
  const user = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };
  const createResponse = await client.user.addUser(user);
  userId = createResponse.data.id;
});

describe('unable to update email for User on the email used by another User (PUT)', () => {
  let notUniqueEmail;
  let response;

  beforeAll(async () => {
    notUniqueEmail = (await client.user.getUsers()).data[5].email;
    response = await client.user.updateUser(userId, { email: notUniqueEmail });
  });

  it('response status code should be 422', async () => {
    expect(response.status).toBe(422);
  });

  it('response should have valid schema', async () => {
    expect(isValidJsonSchema(response.data, '/schemas/errors')).toBe(true);
  });

  it('error object in response should conatin corect data', async () => {
    expect(response.data.length).toBe(1);
    expect(response.data[0].field).toBe('email');
    expect(response.data[0].message).toBe('has already been taken');
  });
});

describe('unable to update email for User on too long email (more than 200 characters) (PUT)', () => {
  let response;

  beforeAll(async () => {
    response = await client.user.updateUser(userId, { email: `${faker.string.alphanumeric(183)}@autotest.fake.dev` });
  });

  it('response status code should be 422', async () => {
    expect(response.status).toBe(422);
  });

  it('response should have valid schema', async () => {
    expect(isValidJsonSchema(response.data, '/schemas/errors')).toBe(true);
  });

  it('error object in response should have correct data', async () => {
    expect(response.data.length).toBe(1);
    expect(response.data[0].field).toBe('email');
    expect(response.data[0].message).toBe('is too long (maximum is 200 characters)');
  });
});

describe('unable to update email for User on invalid email (without @ sing) (PUT)', () => {
  let response;

  beforeAll(async () => {
    response = await client.user.updateUser(userId, { email: `${faker.string.alphanumeric(10)}autotest.fake.dev` });
  });

  it('response status code should be 422', async () => {
    expect(response.status).toBe(422);
  });

  it('response should have valid schema', async () => {
    expect(isValidJsonSchema(response.data, '/schemas/errors')).toBe(true);
  });

  it('error object in response should have correct data', async () => {
    expect(response.data.length).toBe(1);
    expect(response.data[0].field).toBe('email');
    expect(response.data[0].message).toBe('is invalid');
  });
});

describe('unable to update name for User on too long name (more than 200 characters) (PUT)', () => {
  let response;

  beforeAll(async () => {
    response = await client.user.updateUser(userId, { name: faker.string.alphanumeric(201) });
  });

  it('response status code should be 422', async () => {
    expect(response.status).toBe(422);
  });

  it('response should have valid schema', async () => {
    expect(isValidJsonSchema(response.data, '/schemas/errors')).toBe(true);
  });

  it('error object in response should have correct data', async () => {
    expect(response.data.length).toBe(1);
    expect(response.data[0].field).toBe('name');
    expect(response.data[0].message).toBe('is too long (maximum is 200 characters)');
  });
});

describe('unable to update gender for User on invalid value (PUT)', () => {
  let response;

  beforeAll(async () => {
    response = await client.user.updateUser(userId, { gender: 'invalid' });
  });

  it('response status code should be 422', async () => {
    expect(response.status).toBe(422);
  });

  it('response should have valid schema', async () => {
    expect(isValidJsonSchema(response.data, '/schemas/errors')).toBe(true);
  });

  it('error object in response should have correct data', async () => {
    expect(response.data.length).toBe(1);
    expect(response.data[0].field).toBe('gender');
    expect(response.data[0].message).toBe('can\'t be blank, can be male or female');
  });
});

describe('unable to update status for User on invalid value (PUT)', () => {
  let response;

  beforeAll(async () => {
    response = await client.user.updateUser(userId, { status: 'invalid' });
  });

  it('response status code should be 422', async () => {
    expect(response.status).toBe(422);
  });

  it('response should have valid schema', async () => {
    expect(isValidJsonSchema(response.data, '/schemas/errors')).toBe(true);
  });

  it('error object in response should have correct data', async () => {
    expect(response.data.length).toBe(1);
    expect(response.data[0].field).toBe('status');
    expect(response.data[0].message).toBe('can\'t be blank');
  });
});

describe('authorization is required to update User (PUT)', () => {
  let response;
  const userUpd = {
    name: faker.person.fullName({ lastName: 'AutotestUpd' }),
    email: faker.internet.email({ provider: 'autotestupd.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };

  beforeAll(async () => {
    response = await unauthClient.user.updateUser(userId, userUpd);
  });

  it('response status code should be 401', async () => {
    expect(response.status).toBe(401);
  });

  it('error object in response should have correct data', async () => {
    expect(response.data.message).toBe('Authentication failed');
  });
});

afterAll(async () => {
  try {
    await client.user.deletetUser(userId);
  } catch (err) {
    console.log(`Unable to delete user - ${userId}`);
  }
});
