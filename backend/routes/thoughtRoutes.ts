import { Router } from 'express'; // Importing the Router function from Express to define routes
import { getThoughts } from '../controllers/thoughtController'; // Importing the controller function to handle fetching thoughts

const router = Router(); // Creating a new router instance to define routes for "thoughts"

// Route to GET all thoughts from the database
router.get('/', getThoughts); // Use the getThoughts controller to handle GET requests to '/'

export default router; // Export the router so it can be used in other parts of the application