export interface PaymentsRepository {

  Update(id: number): Promise<void>
}
