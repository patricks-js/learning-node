import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { NotFoundError } from "./errors/not-found";
import { GetUserProfileUseCase } from "./get-user-profile";

describe("Use Case -> Get User Profile", () => {
  let _userRepository: InMemoryUserRepository;
  let _sut: GetUserProfileUseCase;

  beforeEach(() => {
    _userRepository = new InMemoryUserRepository();
    _sut = new GetUserProfileUseCase(_userRepository);
  });

  it("should get user profile", async () => {
    const createdUser = await _userRepository.create({
      name: "John Doe",
      email: "john@doe.com",
      passwordHash: "123456",
    });

    const { user } = await _sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(createdUser.id);
  });

  it("should not get user profile with wrong user id", async () => {
    await expect(
      _sut.execute({
        userId: "non-existent-user-id",
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
