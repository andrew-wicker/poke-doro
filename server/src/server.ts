import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config.js';
import authRouter from './routes/authRouter';
import session from 'express-session';
import passport from 'passport';

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
server.use(express.urlencoded({ extended: true }));
server.use(passport.initialize());
server.use(passport.session());

server.use('/', (_req: Request, res: Response) => {
  res.send('request recieved!');
});

server.use('/auth', authRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);

  console.log(errorObj.log);

  return res.status(errorObj.status).json(errorObj.message);
});

server.listen(PORT || 3001, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

export default server;
