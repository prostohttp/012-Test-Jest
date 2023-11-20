import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ default: uuidv4, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop([String])
  authors: string[];

  @Prop()
  favorite: boolean;

  @Prop()
  filecover: string;

  @Prop()
  fileName: string;

  @Prop()
  originalNameFileCover: string;

  @Prop()
  originalNameFileName: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
