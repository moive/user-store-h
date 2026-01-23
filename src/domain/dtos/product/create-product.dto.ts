import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string,
  ) {}
  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = object;
    let availableBoolean = available;

    if (!name) return ["Missing name"];
    if (!user) return ["Missing user"];
    if (!Validators.isMongoId(user)) return ["Invalid user ID"];
    if (!category) return ["Missing category"];
    if (!Validators.isMongoId(category)) return ["Invalid category ID"];
    if (typeof available !== "boolean") {
      availableBoolean = available === "true";
    }
    return [
      undefined,
      new CreateProductDto(
        name,
        availableBoolean,
        price,
        description,
        user,
        category,
      ),
    ];
  }
}
