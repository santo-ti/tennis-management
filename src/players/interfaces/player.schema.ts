import mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    cellPhone: { type: String, unique: true },
    email: { type: String, unique: true },
    name: String,
    ranking: String,
    rankingPosition: Number,
    urlPhoto: String,
  },
  { timestamps: true, collection: 'players' },
);
