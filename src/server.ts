import http from 'node:http';
import path from 'path';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import gameRouter from './routes/game.route';
import IOSetup from './connection';
import express, { Express, Response, Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);
IOSetup(io);

//database
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/Unscrambla';

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('DB Connected');
  } catch (err) {
    console.log('DB connection error: ', err);
  }
})();

//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/games', gameRouter);

app.get('*path', function (req: Request, res: Response) {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = Number(process.env.PORT) || 4000;

server.listen(PORT, () => {
  console.log('Server listening on PORT', PORT);
});
