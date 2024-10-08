import type { Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import type { UserRepository } from "../user-repository";

export class InMemoryUserRepository implements UserRepository {
  #users: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.#users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.#users.find((user) => user.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return this.#users.find((user) => user.id === id) ?? null;
  }
}
