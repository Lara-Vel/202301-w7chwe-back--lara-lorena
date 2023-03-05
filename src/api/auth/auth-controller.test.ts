import { Request, Response } from 'express';
import { UserModel } from '../user/user-schema.js';
import { registerUserController } from './auth-controller.js';
import { encryptPassword } from './auth-utils.js';
import dotenv from 'dotenv';
dotenv.config();
jest.setTimeout(10000);

describe('Given a registerUserController', () => {
  let request: Partial<Request>;
  let response: Partial<Response>;

  beforeEach(() => {
    request = {
      body: {
        email: 'mock@email.com',
        password: 'mockedPassword',
      },
    } as Partial<Request>;

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('When the user tries to register, then the new user should be created on the database', async () => {
    UserModel.create = jest.fn();
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null),
    }));

    const newUser = {
      email: 'mock@email.com',
      password: encryptPassword('mockedPassword'),
    };

    await registerUserController(
      request as Request,
      response as Response,
      jest.fn(),
    );

    expect(UserModel.create).toHaveBeenCalledWith(newUser);
    expect(response.sendStatus).toHaveBeenCalledWith(201);
  });

  test('When the recevied email is already on database, then the response should be a 409 status', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(1),
    }));

    await registerUserController(
      request as Request,
      response as Response,
      jest.fn(),
    );

    expect(response.status).toHaveBeenCalledWith(409);
  });
});

// Describe('Given a login controller', () => {
//   let request: Partial<Request>;
//   let response: Partial<Response>;

//   beforeEach(() => {
//     request = {
//       body: {
//         email: 'mock@email.com',
//         password: 'mockedPassword',
//       },
//     } as Partial<Request>;

//     response = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as Partial<Response>;
//   });
//   Test('When the user tries to login and the response is successful, a token is returned', async () => {
//     jest.setTimeout(60000);
//     UserModel.findOne = jest.fn().mockImplementation(() => ({
//       exec: jest.fn().mockResolvedValue(1),
//     }));

//     const tokenJWT = {
//       accessToken: generateJWTToken(request.body.email),
//     };

//     const responsePromise = loginUserController(
//       request as Request,
//       response as Response,
//       jest.fn(),
//     );
//     await expect(responsePromise).resolves.toEqual(undefined);

//     expect(response.status).toHaveBeenCalledWith(201);
//     expect(response.json).toHaveBeenCalledWith(tokenJWT);
//   });

//   test('When the user tries to login and the user is not found, a 404 is returned', async () => {
//     UserModel.findOne = jest.fn().mockImplementation(() => ({
//       exec: jest.fn().mockResolvedValue(null),
//     }));
//     await loginUserController(
//       request as Request,
//       response as Response,
//       jest.fn(),
//     );
//     expect(response.status).toHaveBeenCalledWith(404);
//   });
// });
