import { faker } from '@faker-js/faker';
import { gender, status } from '../data/sharedData';
import ApiClient from '../api/client';
import isValidJsonSchema from '../utils/responseSchemaValidator';

const client = ApiClient.authorized();
const unauthClient = ApiClient.unauthorized();

describe('unable to create a new User with the email used by another User', () => {
  let response;

  const userWithNotUniqueEmail = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: '',
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };

  beforeAll(async () => {
    userWithNotUniqueEmail.email = (await client.user.getUsers()).data[5].email;
    response = await client.user.addUser(userWithNotUniqueEmail);
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

describe('unable to create a new User with too long email (more than 200 characters)', () => {
  let response;

  const user = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: `${faker.string.alphanumeric(183)}@autotest.fake.dev`,
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };

  beforeAll(async () => {
    response = await client.user.addUser(user);
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

describe('unable to create a new User with invalid email (without @ sing)', () => {
  let response;

  const user = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: `${faker.string.alphanumeric(10)}autotest.fake.dev`,
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };

  beforeAll(async () => {
    response = await client.user.addUser(user);
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

describe('unable to create a new User with missing email', () => {
  let response;

  const userWithoutEmail = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };

  beforeAll(async () => {
    response = await client.user.addUser(userWithoutEmail);
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
    expect(response.data[0].message).toBe('can\'t be blank');
  });
});

describe('unable to create a new User with missing name', () => {
  let response;

  const userWithoutName = {
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };

  beforeAll(async () => {
    response = await client.user.addUser(userWithoutName);
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
    expect(response.data[0].message).toBe('can\'t be blank');
  });
});

describe('unable to create a new User with too long name (more than 200 characters)', () => {
  let response;

  const userWithoutName = {
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    name: faker.string.alphanumeric(201),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };

  beforeAll(async () => {
    response = await client.user.addUser(userWithoutName);
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

describe('unable to create a new User with missing gender', () => {
  let response;

  const userWithouGender = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    status: faker.helpers.arrayElement(status),
  };

  beforeAll(async () => {
    response = await client.user.addUser(userWithouGender);
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

describe('unable to create a new User with invalid value for gender', () => {
  let response;

  const userWithouGender = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    gender: 'invalid',
    status: faker.helpers.arrayElement(status),
  };

  beforeAll(async () => {
    response = await client.user.addUser(userWithouGender);
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

describe('unable to create a new User with missing status', () => {
  let response;

  const userWithoutStatus = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
  };

  beforeAll(async () => {
    response = await client.user.addUser(userWithoutStatus);
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

describe('unable to create a new User with invalid value for status', () => {
  let response;

  const userWithoutStatus = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
    status: 'invalid',
  };

  beforeAll(async () => {
    response = await client.user.addUser(userWithoutStatus);
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

describe('authorization is required to create a new User', () => {
  let response;
  const user = {
    name: faker.person.fullName({ lastName: 'Autotest' }),
    email: faker.internet.email({ provider: 'autotest.fake.dev' }),
    gender: faker.helpers.arrayElement(gender),
    status: faker.helpers.arrayElement(status),
  };

  beforeAll(async () => {
    response = await unauthClient.user.addUser(user);
  });

  it('response status code should be 401', async () => {
    expect(response.status).toBe(401);
  });

  it('error object in response should have correct data', async () => {
    expect(response.data.message).toBe('Authentication failed');
  });
});
