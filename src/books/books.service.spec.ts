import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { BooksService } from "./books.service";
import { Book } from "./schemas/book.schema";
import { CreateBookDto } from "./dto/create.book.dto";

describe("BooksService", () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it("create - должен создавать книгу", async () => {
    const createBookDto: CreateBookDto = {
      title: "test",
      description: "test",
      authors: ["test"],
      favorite: false,
      filecover: "test",
      fileName: "test",
      originalNameFileCover: "test",
      originalNameFileName: "test",
    };

    const createdBook: CreateBookDto = {
      title: "test",
      description: "test",
      authors: ["test"],
      favorite: false,
      filecover: "test",
      fileName: "test",
      originalNameFileCover: "test",
      originalNameFileName: "test",
    };

    jest.spyOn(service, "create").mockResolvedValue(createdBook);

    const result = await service.create(createBookDto);

    expect(result).toEqual(createdBook);
  });

  it("getAll - должен вернуть все книги", async () => {
    const books: Book[] = [
      {
        id: "test",
        title: "test",
        description: "test",
        authors: ["test"],
        favorite: false,
        filecover: "test",
        fileName: "test",
        originalNameFileCover: "test",
        originalNameFileName: "test",
      },
    ];

    jest.spyOn(service["bookModel"], "find").mockResolvedValue(books);
    const result = await service.getAll();
    expect(result).toEqual(books);
  });

  it("getBook - должен вернуть  1 книгу", async () => {
    const book: Book = {
      id: "test",
      title: "test",
      description: "test",
      authors: ["test"],
      favorite: false,
      filecover: "test",
      fileName: "test",
      originalNameFileCover: "test",
      originalNameFileName: "test",
    };
    jest.spyOn(service["bookModel"], "findOne").mockResolvedValue(book);
    const result = await service.getBook("test");
    expect(result).toEqual(book);
  });

  it("delete - должен удалять книгу", async () => {
    const book: Book = {
      id: "test",
      title: "test",
      description: "test",
      authors: ["test"],
      favorite: false,
      filecover: "test",
      fileName: "test",
      originalNameFileCover: "test",
      originalNameFileName: "test",
    };
    jest
      .spyOn(service["bookModel"], "findOneAndDelete")
      .mockResolvedValue(book);
    const result = await service.delete("test");
    expect(result).toEqual({ success: true });
  });

  it("update - должен обновить найденную книгу", async () => {
    const existingBook = {
      _id: "test",
      title: "test",
      description: "test",
      authors: ["test"],
      favorite: false,
      filecover: "test",
      fileName: "test",
      originalNameFileCover: "test",
      originalNameFileName: "test",
    };

    const updatedFields = {
      title: "test1",
    };

    const updatedBook = {
      _id: "test",
      title: "test1",
      description: "test",
      authors: ["test"],
      favorite: false,
      filecover: "test",
      fileName: "test",
      originalNameFileCover: "test",
      originalNameFileName: "test",
    };

    jest.spyOn(service["bookModel"], "findOne").mockResolvedValue(existingBook);

    jest
      .spyOn(service["bookModel"], "findOneAndUpdate")
      .mockResolvedValue(updatedBook);

    const result = await service.update("test", updatedFields);

    expect(result).toEqual(updatedBook);
  });
});
