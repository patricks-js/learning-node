import type { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import type { CheckInRepository } from "../check-in-repository";

export class InMemoryCheckInRepository implements CheckInRepository {
  #checkIns: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
    };

    this.#checkIns.push(checkIn);

    return checkIn;
  }
}
