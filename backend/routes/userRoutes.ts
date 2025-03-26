import { Router } from 'express'; // Importing the Router function from Express to define routes

const router = Router(); // Creating a new router instance to define routes for "users"

// Define your routes here
router.get('/', (req, res) => {
  // When a GET request is made to the root path ('/'), this function will handle it
  res.send('User route'); // Send a simple response back to the client
});

export default router; // Export the router so it can be used in other parts of the application