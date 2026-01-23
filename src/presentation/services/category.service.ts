import {
  CreateCategoryDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from "../../domain";
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

  async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      // const total = await CategoryModel.countDocuments();
      // const categories = await CategoryModel.find()
      //   .skip((page - 1) * limit)
      //   .limit(limit);

      const hasNextPage = page * limit < total;
      const hasPrevPage = page > 1;

      return {
        total,
        page,
        limit,
        next: hasNextPage
          ? `/api/categories?page=${page + 1}&limit=${limit}`
          : null,
        prev: hasPrevPage
          ? `/api/categories?page=${page - 1}&limit=${limit}`
          : null,
        categories: categories.map(({ id, name, available }) => ({
          id,
          name,
          available,
        })),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
