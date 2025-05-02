import { Request, Response } from 'express'; // Importing Request and Response types from Express
import { getAllUsers } from '../controllers/userController'; // Importing the getAllUsers function from the userController
import User from '../models/User'; // Importing the User model to interact with the database
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'; // Importing Jest functions for testing

interface IUser {
  _id: string; // The unique ID of the user
  username: string; // The username of the user
}

// Grouping all tests related to the User Controller
describe('User Controller', () => {
  let req: Partial<Request>; // A mock version of the Express Request object
  let res: Partial<Response>; // A mock version of the Express Response object
  let jsonMock: jest.Mock<any>; // A mock function to simulate the res.json method
  let statusMock: jest.Mock<any>; // A mock function to simulate the res.status method

  // Set up mock Request and Response objects before each test
  beforeEach(() => {
    req = {}; // Initialize an empty mock Request object
    jsonMock = jest.fn(); // Create a mock function for res.json
    statusMock = jest.fn().mockReturnValue({ json: jsonMock }); // Create a mock function for res.status that returns the mock res.json
    res = {
      status: statusMock, // Assign the mock status function to res.status
      json: jsonMock, // Assign the mock json function to res.json
    } as unknown as Response; // Cast the mock object to the Response type
  });

  // Restore all mocked functions after each test
  afterEach(() => {
    jest.restoreAllMocks(); // Reset all mocks to their original implementations
  });

  // Grouping tests related to the getAllUsers function
  describe('getAllUsers', () => {
    // Test case: should return 404 when no users are found
    it('should return 404 when no users are found', async () => {
      // Mock the User.find method to simulate no users being found
      jest.spyOn(User, 'find').mockResolvedValueOnce([]); // Simulate no users found

      // Call the getAllUsers function with the mock Request and Response objects
      await getAllUsers(req as Request, res as Response);

      // Verify that res.status was called with 404
      expect(statusMock).toHaveBeenCalledWith(404);
      // Verify that res.json was called with the expected error message
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: 'No users found',
      });
    });
  });
});
