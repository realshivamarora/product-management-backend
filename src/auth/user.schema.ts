import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ["admin", "user"], default: "admin" })
  role: string;

  @Prop({ default: Date.now }) // Sets createdAt to the current time
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
