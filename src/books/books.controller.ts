import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { BookDocument } from "./schemas/book.schema";
import { CreateBookDto } from "./dto/create.book.dto";
import { RequestType } from "./interfaces/requestType";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(
    @Body() book: CreateBookDto,
  ): Promise<BookDocument | RequestType> {
    return await this.booksService.create(book);
  }

  @Get()
  async getAll(): Promise<BookDocument[]> {
    return this.booksService.getAll();
  }

  @Get(":id")
  async getBook(@Param("id") id: string): Promise<BookDocument | RequestType> {
    return this.booksService.getBook(id);
  }

  @Delete(":id")
  async deleteBook(@Param("id") id: string): Promise<RequestType> {
    return this.booksService.delete(id);
  }

  @Put(":id")
  async updateBook(
    @Param("id") id: string,
    @Body() book: Partial<CreateBookDto>,
  ): Promise<BookDocument | RequestType> {
    return this.booksService.update(id, book);
  }
}
