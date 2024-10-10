export interface DeleteProductByIdPort {
  Execute(id: number): Promise<void>
}
