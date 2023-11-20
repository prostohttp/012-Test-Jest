import { HttpException, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Book, BookDocument } from "./schemas/book.schema";
import { CreateBookDto } from "./dto/create.book.dto";
import { RequestType } from "./interfaces/requestType";

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(
    createBookDto: CreateBookDto,
  ): Promise<BookDocument | RequestType> {
    try {
      const createdBook = new this.bookModel(createBookDto);
      if (createdBook) {
        return createdBook.save();
      } else {
        return {
          error: "not created",
        };
      }
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async getAll(): Promise<BookDocument[]> {
    try {
      return this.bookModel.find();
    } catch (error) {
      throw new HttpException("Ошибка сервера", 500);
    }
  }

  async getBook(id: string): Promise<BookDocument | RequestType> {
    try {
      const book = await this.bookModel.findOne({ id: id });
      if (book) {
        return book;
      } else {
        return {
          error: "not found",
        };
      }
    } catch (error) {
      throw new HttpException("Ошибка сервера", 500);
    }
  }

  async delete(id: string): Promise<RequestType> {
    try {
      const deletedBook = await this.bookModel.findOneAndDelete({ id: id });
      if (deletedBook) {
        return {
          success: true,
        };
      } else {
        return {
          error: "not found",
        };
      }
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(
    id: string,
    updatedFields: Partial<CreateBookDto>,
  ): Promise<BookDocument | RequestType> {
    try {
      const foundedBook = await this.bookModel.findOne({ id: id });
      if (foundedBook) {
        return this.bookModel.findOneAndUpdate({ id: id }, updatedFields, {
          new: true,
        });
      } else {
        return {
          error: "not found",
        };
      }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
