import request from 'supertest';
import { app } from '../../app';
import { getKeyCount, incrementKeyCount,keyMap } from '../../storage/key-map';

//I did not use jest.mock because I want to test the actual implementation of the function where keymap is just a local variable.
beforeEach(() => {
  keyMap.clear();
});

describe('GET /query', () => {
  it('should return 400 if key is not provided', async () => {
    const response = await request(app).get('/query');
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe('Must be provided as a query string.');
  });

  it('should return 400 if key is too long', async () => {
    const longKey = 'a'.repeat(201);
    const response = await request(app).get(`/query?key=${longKey}`);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe('key is too long. Max(200)');
  });

  it('should return 200 and the count if key is valid', async () => {
    const validKey = 'validKey';
    incrementKeyCount(validKey);

    const response = await request(app).get(`/query?key=${validKey}`);
    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
  });

  it('should return the correct count for getKeyCount', () => {
    const key = 'testKey';
    incrementKeyCount(key);
    incrementKeyCount(key);

    const count = getKeyCount(key);
    expect(count).toBe(2);
  });
});