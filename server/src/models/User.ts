import mongoose, { Schema, Document } from 'mongoose';
interface IUser extends Document {
  googleId: string;
  displayName: string;
  pokemonIds: number[];
}

const userSchema: Schema = new mongoose.Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  displayName: String,
  pokemonIds: [Number],
});

const User = mongoose.model<IUser>('User', userSchema, 'pokedoroUsers');

export default User;
