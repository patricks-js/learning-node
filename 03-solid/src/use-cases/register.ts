import { env } from "@/config/env";
import type { UserRepository } from "@/repositories/user-repository";
import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UserAlreadyExistsError } from "./errors";
import type { UseCase } from "./protocols/use-case";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisterOutput {
  user: User;
}

export class RegisterUseCase implements UseCase<RegisterInput, RegisterOutput> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterInput): Promise<RegisterOutput> {
    const userWithSameEmail = await this.userRepository.findByEmail(
      input.email,
    );

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await bcrypt.hash(input.password, env.HASH_SALT);

    const user = await this.userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    return {
      user,
    };
  }
}
