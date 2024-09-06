import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors";
import { RegisterUseCase } from "./register";

describe("Use Case -> Register User", () => {
  it("should hash user password upon registration", async () => {
    const userRepository = new InMemoryUserRepository();
    const useCase = new RegisterUseCase(userRepository);
    const password = "123456";

    const { user } = await useCase.execute({
      name: "John Doe",
      email: "john@doe.com",
      password,
    });

    const isPasswordHashed = await compare(password, user.passwordHash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should throw error if user with same email already exists", async () => {
    const userRepository = new InMemoryUserRepository();
    const useCase = new RegisterUseCase(userRepository);
    const email = "john@doe.com";

    await useCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(
      useCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should register a user successfully", async () => {
    const userRepository = new InMemoryUserRepository();
    const useCase = new RegisterUseCase(userRepository);

    const { user } = await useCase.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
