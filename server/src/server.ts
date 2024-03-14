import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config.js';
import authRouter from './routes/authRouter';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { connectDB } from './models/db';

const server = express();
const PORT = process.env.PORT || 3000;

server.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(passport.initialize());
server.use(passport.session());

server.use('/auth', authRouter);

server.use('/home', (_req: Request, res: Response) => {
  res.send('Successfully logged in with Google!');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred on the Pokedoro server' },
  };

  const errorObj = Object.assign({}, defaultErr, err);

  console.log(errorObj.log);

  return res.status(errorObj.status).json(errorObj.message);
});

connectDB().then(() => {
  server.listen(PORT || 3001, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
});

export default server;
