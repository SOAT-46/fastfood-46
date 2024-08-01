// Define an interface for the request parameters
interface ProductParams {
  id: number;
}

// Define an interface for the request body
interface UpdateProductBody {
  name: string;
  description: string;
  price: number;
}

export {ProductParams, UpdateProductBody}
