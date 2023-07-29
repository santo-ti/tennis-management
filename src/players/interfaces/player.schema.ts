import mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    cellPhone: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    name: { type: String, require: true },
    ranking: String,
    rankingPosition: Number,
    urlPhoto: String,
  },
  { timestamps: true, collection: 'players' },
);
