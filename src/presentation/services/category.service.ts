import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";
import { CategoryModel } from "../../models";

export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const existsCategory = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });

    if (existsCategory) throw CustomError.badRequest("Category already exist");

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
