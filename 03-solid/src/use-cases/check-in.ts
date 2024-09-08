import type { CheckInRepository } from "@/repositories/check-in-repository";
import type { CheckIn } from "@prisma/client";
import type { UseCase } from "./protocols/use-case";

export interface CheckInInput {
  userId: string;
  gymId: string;
}

export interface CheckInOutput {
  checkIn: CheckIn;
}

export class CheckInUseCase implements UseCase<CheckInInput, CheckInOutput> {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({ userId, gymId }: CheckInInput): Promise<CheckInOutput> {
    const checkIn = await this.checkInRepository.create({
      userId,
      gymId,
    });

    return {
      checkIn,
    };
  }
}
