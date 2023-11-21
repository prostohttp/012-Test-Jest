import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { BookDocument } from "./books/schemas/book.schema";

describe("BooksController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/books (POST) - должен создать книгу", () => {
    const newBook = {
      title: "Вы не знаете JavaScript!",
      description: "This",
      authors: ["Author 1"],
      favorite: false,
      filecover: "path/to/filecover.jpg",
      fileName: "path/to/book.pdf",
      originalNameFileCover: "filecover.jpg",
      originalNameFileName: "book.pdf",
    };
    return request(app.getHttpServer())
      .post("/books")
      .send(newBook)
      .expect(201)
      .expect((res) => {
        const createdBook: BookDocument = res.body;
        expect(createdBook).toBeDefined();
        expect(createdBook.id).toBeDefined();
        expect(createdBook.title).toBe(newBook.title);
        expect(createdBook.authors).toStrictEqual(newBook.authors);
        expect(createdBook.favorite).toBe(newBook.favorite);
        expect(createdBook.filecover).toBe(newBook.filecover);
        expect(createdBook.fileName).toBe(newBook.fileName);
        expect(createdBook.originalNameFileCover).toBe(
          newBook.originalNameFileCover,
        );
        expect(createdBook.originalNameFileName).toBe(
          newBook.originalNameFileName,
        );
      });
  });

  it("/books (GET) - должен получить все книги", () => {
    return request(app.getHttpServer())
      .get("/books")
      .expect(200)
      .expect((res) => {
        const books: BookDocument[] = res.body;
        expect(books).toBeDefined();
        expect(books.length).toBeGreaterThan(0);
      });
  });

  it("/books/:id (GET) - должен получить книгу по идентификатору", () => {
    const id = "891a6d74-ee3d-47ae-bd23-f0efdf9273a3";
    return request(app.getHttpServer())
      .get(`/books/${id}`)
      .expect(200)
      .expect((res) => {
        const book: BookDocument = res.body;
        expect(book).toBeDefined();
        expect(book.id).toBe(id);
      });
  });

  it("/books/:id (DELETE) - должен удалить книгу по идентификатору", () => {
    const id = "655a080d9a3125875b53eb56";
    return request(app.getHttpServer()).delete(`/books/${id}`).expect(200);
  });

  it("/books/:id (PUT) - должен обновить книгу по идентификатору", () => {
    const id = "891a6d74-ee3d-47ae-bd23-f0efdf9273a3";
    const updatedBook = {
      // Обновленные поля книги
      title: "Новое название книги",
      authors: ["Новый автор"],
    };
    return request(app.getHttpServer())
      .put(`/books/${id}`)
      .send(updatedBook)
      .expect(200)
      .expect((res) => {
        const updatedBook: BookDocument = res.body;
        expect(updatedBook).toBeDefined();
        expect(updatedBook.id).toBe(id);
        expect(updatedBook.title).toBe(updatedBook.title);
        expect(updatedBook.authors).toBe(updatedBook.authors);
      });
  });
});
