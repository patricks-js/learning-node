import { env } from "@/config/env";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors";

describe("Use Case -> Authenticate User", () => {
  let _userRepository: InMemoryUserRepository;
  let _sut: AuthenticateUseCase;

  beforeEach(() => {
    _userRepository = new InMemoryUserRepository();
    _sut = new AuthenticateUseCase(_userRepository);
  });

  it("should authenticate a user successfully", async () => {
    await _userRepository.create({
      name: "John Doe",
      email: "john@doe.com",
      passwordHash: await hash("123456", env.HASH_SALT),
    });

    const { user } = await _sut.execute({
      email: "john@doe.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not authenticate a user with wrong email", async () => {
    await expect(
      _sut.execute({
        email: "inexistent@email.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should authenticate a user successfully", async () => {
    const wrongPassword = "123";

    await _userRepository.create({
      name: "John Doe",
      email: "john@doe.com",
      passwordHash: await hash("123456", env.HASH_SALT),
    });

    await expect(
      _sut.execute({
        email: "john@doe.com",
        password: wrongPassword,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
