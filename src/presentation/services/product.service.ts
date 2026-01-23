import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { ProductModel } from "../../models";

export class ProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    const existsProduct = await ProductModel.findOne({
      name: createProductDto.name,
    });

    if (existsProduct) throw CustomError.badRequest("Product already exist");

    try {
      const product = new ProductModel({
        ...createProductDto,
      });

      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user")
          .populate("category"),
      ]);

      const hasNextPage = page * limit < total;
      const hasPrevPage = page > 1;

      return {
        total,
        page,
        limit,
        next: hasNextPage
          ? `/api/products?page=${page + 1}$limit=${limit}`
          : null,
        prev: hasPrevPage
          ? `/api/products?page=${page - 1}&limit=${limit}`
          : null,

        products,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
