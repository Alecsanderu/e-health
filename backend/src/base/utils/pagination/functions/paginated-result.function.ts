import { valueIsEmpty } from '~utils/validation/is-empty.function';
import { Result } from '~utils/result/result';
import { PaginatedResult } from '~utils/pagination/models/paginated-result';
import { Ok } from '~utils/result/result.functions';

export function paginatedResult<T>(result: T[] | null, currentPageNumber: number, recordsPerPage: number, totalRecords: number): Result<PaginatedResult<T>> {

    const data = valueIsEmpty( result )
                 ? []
                 : result!;
    const hasPrevious = valueIsEmpty( result )
                        ? false
                        : currentPageNumber > 0;
    const totalPages = Math.ceil( totalRecords / recordsPerPage );
    const hasNext = valueIsEmpty( result )
                    ? false
                    : Number( currentPageNumber ) + 1 < totalPages;

    return Ok( new PaginatedResult( { data, hasPrevious, hasNext, totalPages, totalRecords } ) );
}
