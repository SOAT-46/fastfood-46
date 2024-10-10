import {FastifyRequest, FastifyReply} from 'fastify';
import {Params} from "./routes/parameters/types";
import {GetProductsByCategoryUseCase, Listeners} from "../../application/usecases/get_products_by_category_use_case";
import {PaginatedResponse} from "../../../shared/paginated_response";
import {Product} from "../../domain/models/product";

export class GetProductsByCategoryController {
  public constructor(private readonly getProductsUseCase: GetProductsByCategoryUseCase) {}

  public async execute(request: FastifyRequest<{Params: Params}>, response: FastifyReply): Promise<void> {
    const id = Number(request.params.id);
    const {page = 1, limit = 10} = request.query as { page?: number, limit?: number };
    const listeners: Listeners = {
      onSuccess: (page) => this.onSuccess(page, response),
      onEmpty: () => this.onEmpty(response)
    }
    return this.getProductsUseCase.execute(id, page, limit, listeners)
  }

  private onSuccess(page: PaginatedResponse<Product>, response: FastifyReply) {
    response.code(200).send(page);
  }

  private onEmpty(response: FastifyReply) {
    response.code(204)
  }
}
