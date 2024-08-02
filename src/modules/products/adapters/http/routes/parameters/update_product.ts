interface ProductParams {
  id: number;
}

interface UpdateProductBody {
  name: string;
  description: string;
  price: number;
}

export {ProductParams, UpdateProductBody}
