import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = new Book();
    book.id = createBookDto.id;
    book.name = `${createBookDto.name} ${createBookDto.age}`;
    return await this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ id });
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ id });
    book.id = updateBookDto.id;
    book.name = `${updateBookDto.name} ${updateBookDto.age}`;
    return await this.bookRepository.save(book);
  }

  async remove(id: number) {
    return await this.bookRepository.delete({ id });
  }
}
