interface Params {
  id: number;
}

interface UpdateProductBody {
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export {Params, UpdateProductBody}
