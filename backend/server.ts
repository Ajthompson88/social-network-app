// server.ts
import express from 'express';
import routes from './routes/index.js';
import { connectDB } from './config/db.js';


const app = express();
const PORT = Number(process.env.PORT) || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

})
