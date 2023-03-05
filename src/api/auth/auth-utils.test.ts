import crypto from 'node:crypto';
import { createCypher, generateJWTToken } from './auth-utils.js';
import jwt, { JwtPayload } from 'jsonwebtoken';

describe('createCypher', () => {
  const algorithm = 'aes-256-ecb';
  const key = 'test_key';
  const iv = Buffer.alloc(16);

  beforeAll(() => {
    process.env.PASSWORD_ENCRYPTION_ALGORITHM = algorithm;
    process.env.PASSWORD_ENCRYPTION_KEY = key;
  });

  afterAll(() => {
    delete process.env.PASSWORD_ENCRYPTION_ALGORITHM;
    delete process.env.PASSWORD_ENCRYPTION_KEY;
  });

  test('should create a cipher with the correct parameters', () => {
    const hashSpy = jest.spyOn(crypto, 'createHash').mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnThis(),
      substring: jest.fn().mockReturnValue(Buffer.alloc(32)),
    } as any);

    const randomBytesSpy = jest
      .spyOn(crypto, 'randomBytes')
      .mockReturnValue(iv as any);

    const createCipherivSpy = jest
      .spyOn(crypto, 'createCipheriv')
      .mockReturnValue('cipher' as any);

    const cipher = createCypher();

    expect(crypto.createHash).toHaveBeenCalledWith('sha256');
    expect(hashSpy.mock.results[0].value.update).toHaveBeenCalledWith(key);
    expect(hashSpy.mock.results[0].value.digest).toHaveBeenCalledWith('base64');
    expect(crypto.randomBytes).toHaveBeenCalledWith(0);
    expect(crypto.createCipheriv).toHaveBeenCalledWith(
      algorithm,
      expect.anything(),
      iv,
    );

    expect(cipher).toBe('cipher');
    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(randomBytesSpy).toHaveBeenCalledTimes(1);
    expect(createCipherivSpy).toHaveBeenCalledTimes(1);

    hashSpy.mockRestore();
    randomBytesSpy.mockRestore();
    createCipherivSpy.mockRestore();
  });

  test('should throw an error if the encryption algorithm is not defined', () => {
    delete process.env.PASSWORD_ENCRYPTION_ALGORITHM;
    expect(() => createCypher()).toThrowError(
      new Error('Encryption algorithm must be defined on env'),
    );
  });

  test('should throw an error if the encryption key is not defined', () => {
    process.env.PASSWORD_ENCRYPTION_ALGORITHM = algorithm;
    delete process.env.PASSWORD_ENCRYPTION_KEY;
    expect(() => createCypher()).toThrowError(
      new Error('Encryption key must be defined on env'),
    );
  });
});

describe('generateJWTToken', () => {
  it('should generate a JWT token with the provided email and secret', () => {
    const email = 'test@example.com';
    process.env.JWT_SECRET = 'holo';

    const token = generateJWTToken(email);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    expect(decoded.email).toBe(email);
  });

  it('should throw an error if JWT_SECRET environment variable is not defined', () => {
    delete process.env.JWT_SECRET;

    expect(() => generateJWTToken('test@example.com')).toThrowError(
      new Error('JWT_SECRET environment should be defined'),
    );
  });
});
