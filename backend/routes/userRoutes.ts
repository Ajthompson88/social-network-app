import { Router } from 'express'; // Importing the Router function from Express to define routes
import { getAllUsers } from '../controllers/userController'; // Importing the controller function to handle fetching users

const router = Router(); // Creating a new router instance to define routes for "users"

// Route to GET all users from the database
router.get('/', getAllUsers); // Use the getAllUsers controller to handle GET requests to '/'

export default router; // Export the router so it can be used in other parts of the application