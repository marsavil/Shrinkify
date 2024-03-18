import { Document, Types } from 'mongoose';

interface User extends Document {
  id: string;
  username: string;
  name: string;
  image?: string;
  links: Types.ObjectId[]; // Array de ObjectIds
  onboarded: boolean;
}

export default User;