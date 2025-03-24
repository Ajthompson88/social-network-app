import { Request, Response } from 'express';
import { getAllUsers } from '../controllers/userController';
import User from '../models/User';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

interface IUser {
  _id: string;
  username: string;
}

describe('User Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock<any>;
  let statusMock: jest.Mock<any>;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock,
      json: jsonMock,
    } as unknown as Response;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return 404 when no users are found', async () => {
      // Use mockImplementationOnce to simulate chainable populate behavior.
      jest.spyOn(User, 'find').mockImplementationOnce(() => {
        return {
          populate: () => {
            return {
              populate: () => Promise.resolve([] as IUser[]),
            };
          },
        } as any;
      });

      await getAllUsers(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: 'No users found',
      });
    });
  });
});
// Compare this snippet from backend/controllers/userController.ts:
// import { Request, Response } from 'express'; 
// import User from '../models/User';
