import type { UserRepository } from "@/repositories/user-repository";
import type { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors";
import type { UseCase } from "./protocols/use-case";

export interface AuthenticateInput {
  email: string;
  password: string;
}

export interface AuthenticateOutput {
  user: User;
}

export class AuthenticateUseCase
  implements UseCase<AuthenticateInput, AuthenticateOutput>
{
  constructor(private userRepository: UserRepository) {}

  async execute(input: AuthenticateInput): Promise<AuthenticateOutput> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new InvalidCredentialsError();

    const isPasswordValid = await compare(input.password, user.passwordHash);
    if (!isPasswordValid) throw new InvalidCredentialsError();

    return {
      user,
    };
  }
}
