import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
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
});
