import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import User from '../models/User';

const dbRouter = express.Router();

dbRouter.post(
  '/addPokemon',
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('addPokemon router');
    const { userId, pokemonId } = req.body;

    try {
      await User.findOneAndUpdate(
        { googleId: userId },
        {
          $push: { pokemonIds: pokemonId },
        },
        { new: true }
      );
      res.status(200).send('Pokemon added successfully');
    } catch (error) {
      console.error('Failed to add Pokemon: ', error);
      const errorObj = {
        log: 'dbRouter error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred on the dbRouter' },
      };
      return next(errorObj);
    }
  }
);

export default dbRouter;
