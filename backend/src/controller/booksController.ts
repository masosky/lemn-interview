import { Controller, Get, Post, Route, Tags, Response } from "tsoa";
import prismaClient from "../client/prismaClient";
import { ApiResponse, GenericResponse } from "./controllerTypes";
import { Book } from "@prisma/client";

@Route("api/books")
@Tags("Books")
export class BooksController extends Controller {
  /**
   * Fetch all books (with optional search and pagination)
   */
  @Get("/")
  @Response<ApiResponse<Book[]>>(200, "Books retrieved successfully")
  @Response<GenericResponse>(500, "Internal Server Error")
  public async getBooks() {
    const books = await prismaClient.book.findMany();

    return {
      message: "Books retrieved successfully",
      data: books,
    };
  }

  @Post("/")
  @Response<ApiResponse<Book[]>>(200, "Book created successfully")
  @Response<GenericResponse>(500, "Internal Server Error")
  public async createBook() {
    throw new Error("TODO news implementation");
  }
}
