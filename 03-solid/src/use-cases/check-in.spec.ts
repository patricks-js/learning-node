import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./check-in";

describe("Use Case -> Check In", () => {
  let _checkInRepository: InMemoryCheckInRepository;
  let _sut: CheckInUseCase;

  beforeEach(() => {
    _checkInRepository = new InMemoryCheckInRepository();
    _sut = new CheckInUseCase(_checkInRepository);
  });

  it("should create a check-in", async () => {
    const { checkIn } = await _sut.execute({
      userId: "user-1",
      gymId: "gym-1",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
