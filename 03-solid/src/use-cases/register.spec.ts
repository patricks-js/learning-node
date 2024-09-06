import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors";
import { RegisterUseCase } from "./register";

describe("Use Case -> Register User", () => {
  let _userRepository: InMemoryUserRepository;
  let _sut: RegisterUseCase;

  beforeEach(() => {
    _userRepository = new InMemoryUserRepository();
    _sut = new RegisterUseCase(_userRepository);
  });

  it("should hash user password upon registration", async () => {
    const password = "123456";

    const { user } = await _sut.execute({
      name: "John Doe",
      email: "john@doe.com",
      password,
    });

    const isPasswordHashed = await compare(password, user.passwordHash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should throw error if user with same email already exists", async () => {
    const email = "john@doe.com";

    await _sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(
      _sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should register a user successfully", async () => {
    const { user } = await _sut.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
