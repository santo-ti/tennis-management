import { Document, Types } from 'mongoose';

export class Player extends Document {
  readonly _id: Types.ObjectId;
  cellPhone: string;
  email: string;
  name: string;
  ranking?: string;
  rankingPosition?: number;
  urlPhoto?: string;
}
