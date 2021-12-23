export interface IPaginationResult<PaginationEntity> {
    data: PaginationEntity[];
    totalRecords: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}
