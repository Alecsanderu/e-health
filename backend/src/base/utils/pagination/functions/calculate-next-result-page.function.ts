import { defaultTo } from 'lodash';
import { MAX_ITEMS_PER_PAGE } from '~config/constants/pagination.constant';

export function calculateNextResultPage(pageNumber: number, itemsPerPage: number) {

    pageNumber = defaultTo( pageNumber, 0 );
    itemsPerPage = Math.min( defaultTo( itemsPerPage, MAX_ITEMS_PER_PAGE ), MAX_ITEMS_PER_PAGE );

    const skip = pageNumber * itemsPerPage;
    const take = itemsPerPage;

    return { skip, take };
}
