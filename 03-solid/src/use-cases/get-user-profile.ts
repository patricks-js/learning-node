import type { UserRepository } from "@/repositories/user-repository";
import type { User } from "@prisma/client";
import { NotFoundError } from "./errors/not-found";
import type { UseCase } from "./protocols/use-case";

interface GetUserProfileInput {
  userId: string;
}

interface GetUserProfileOutput {
  user: User;
}

export class GetUserProfileUseCase
  implements UseCase<GetUserProfileInput, GetUserProfileOutput>
{
  constructor(private userRepository: UserRepository) {}

  async execute(input: GetUserProfileInput): Promise<GetUserProfileOutput> {
    const user = await this.userRepository.findById(input.userId);

    if (!user) throw new NotFoundError("User");

    return {
      user,
    };
  }
}
