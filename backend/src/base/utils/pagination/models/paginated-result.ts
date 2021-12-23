import { IPaginationResult } from '~utils/pagination/interfaces/pagination-result.interface';

export class PaginatedResult<T> {
    public data: T[];
    public totalPageItems: number;
    public totalRecords: number;
    public totalPages: number;
    public hasPrevious: boolean;
    public hasNext: boolean;

    constructor(paginationResults: IPaginationResult<T>) {
        this.data = paginationResults.data;
        this.totalPageItems = paginationResults.data.length;
        this.totalRecords = paginationResults.totalRecords;
        this.totalPages = paginationResults.totalPages;
        this.hasPrevious = paginationResults.hasPrevious;
        this.hasNext = paginationResults.hasNext;
    }
}
