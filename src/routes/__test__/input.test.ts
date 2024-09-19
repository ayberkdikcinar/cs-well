import request from 'supertest';
import { app } from '../../app';
import { validationMessages } from '../../constants/validation-messages';

describe('POST /input', () => {
  it('should return 201 and success message for valid input', async () => {
    const response = await request(app).post('/input').send({ key: 'validKey' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Success' });
  });

  it('should return 400 if key is not provided', async () => {
    const response = await request(app).post('/input').send({});

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe(validationMessages.keyRequiredBody);
  });

  it('should return 400 if key is not a string', async () => {
    const response = await request(app).post('/input').send({ key: 123 });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe(validationMessages.keyString);
  });

  it('should return 400 if key is too long', async () => {
    const longKey = 'a'.repeat(201);
    const response = await request(app).post('/input').send({ key: longKey });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe(validationMessages.keyTooLong);
  });
});
