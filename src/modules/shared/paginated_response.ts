class PaginatedResponse<T> {
  public constructor(
    public data: T[],
    public meta: Meta) {}

  public IsEmpty(): boolean {
    return this.data.length === 0;
  }
}

class Meta {
  public constructor(
    public totalCount: number,
    public totalPages: number,
    public currentPage: number,
    public perPage: number) {}
}

export {PaginatedResponse, Meta}
