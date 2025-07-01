import {
  getValidationRules,
  IsEnum,
  IsRequired,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsArray,
  Length,
  IsNumericString,
  IsDate,
  MaxDigits,
  Digits,
} from "../decorators";

enum Role {
  ADMIN = "admin",
  USER = "user",
}

class Address {
  @IsString()
  street: string = "";

  @IsNumber()
  number: number = 0;
}

class User {
  @IsEnum(Role, "Invalid role")
  role: Role = Role.USER;

  @IsRequired()
  name: string = "";

  @IsOptional()
  nickname?: string;

  @IsString()
  email: string = "";

  @IsNumber()
  age: number = 0;

  @IsBoolean()
  isActive: boolean = true;

  @ValidateNested(() => Address)
  address: Address = new Address();

  @IsArray(() => Address)
  previousAddresses: Address[] = [];

  @Length({ min: 5, max: 10, minMessage: "Too short", maxMessage: "Too long" })
  username: string = "";

  @IsNumericString("Only numbers")
  document: string = "";

  @IsDate("Must be a date")
  birthDate: Date = new Date();

  @MaxDigits(6, "Too many digits")
  salary: number = 0;

  @Digits({ integer: 5, fraction: 2 }, "Wrong digit format")
  balance: number = 0;
}

describe("Decorators validation metadata", () => {
  it("should collect all validation rules", () => {
    const user = new User();
    const rules = getValidationRules(user);

    expect(rules).toHaveProperty("role");
    expect(rules.role).toMatchObject({ type: "enum", enum: Role });

    expect(rules).toHaveProperty("name");
    expect(rules.name.required).toBe(true);

    expect(rules).toHaveProperty("nickname");
    expect(rules.nickname.required).toBe(false);

    expect(rules.email.type).toBe("string");
    expect(rules.age.type).toBe("number");
    expect(rules.isActive.type).toBe("boolean");

    expect(rules.address).toMatchObject({ type: "object" });
    expect(rules.previousAddresses.type).toBe("array");

    expect(rules.username).toMatchObject({ minLength: 5, maxLength: 10 });
    expect(rules.document).toMatchObject({ numericOnly: true });
    expect(rules.birthDate.type).toBe("date");
    expect(rules.salary.maxDigits).toBe(6);
    expect(rules.balance.digits).toMatchObject({ integer: 5, fraction: 2 });
  });

  it("should throw error when ValidateNested used on non-field", () => {
    const mockContext = { kind: "method", addInitializer: () => {} } as any;
    expect(() =>
      ValidateNested(() => Address)(null as any, mockContext)
    ).toThrow("ValidateNested solo puede usarse en propiedades");
  });

  it("should throw error when IsArray used on non-field", () => {
    const mockContext = { kind: "method", addInitializer: () => {} } as any;
    expect(() => IsArray(() => Address)(null as any, mockContext)).toThrow(
      "IsArray solo puede usarse en propiedades"
    );
  });
});
