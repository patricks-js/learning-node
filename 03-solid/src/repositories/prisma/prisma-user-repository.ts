import { prisma } from "@/config/prisma";
import type { Prisma, User } from "@prisma/client";
import type { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
