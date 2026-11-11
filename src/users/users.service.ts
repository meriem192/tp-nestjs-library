import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
   private users: User[] = [
    { id: 1, firstName: "Amira", lastName: "Ben Ali",
      email: "amira@example.com", age: 22, isActive: true },
    { id: 2, firstName: "Karim", lastName: "Mansour",
      email: "karim@example.com", age: 24, isActive: true },
    { id: 3, firstName: "Sarra", lastName: "Trabelsi",
      email: "sarra@example.com", age: 21, isActive: false },
  ];
  private nextId = 4;
 
  findAll(): User[] {
    return this.users;
  }
 
  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`Utilisateur ${id} introuvable`);
    }
    return user;
  }
   create(dto: CreateUserDto): User {
    const email = dto.email.toLowerCase();
    if (this.users.some((u) => u.email.toLowerCase() === email)) {
      throw new ConflictException("Email déjà utilisé");
    }
    const user: User = { id: this.nextId++, ...dto, email };
    this.users.push(user);
    return user;
  }
 
  update(id: number, dto: UpdateUserDto): User {
    const user = this.findOne(id);
    if (dto.email !== undefined) {
      const email = dto.email.toLowerCase();
      if (this.users.some((u) =>
        u.id !== id && u.email.toLowerCase() === email)) {
        throw new ConflictException("Email déjà utilisé");
      }
      dto.email = email;
    }
    Object.assign(user, dto);
    return user;
  }
 
  remove(id: number): void {
    this.findOne(id);
    this.users = this.users.filter((u) => u.id !== id);
  }
}


