import { PaginationType } from '../types/Pagination.type';

export const Pagination = (data: PaginationType) => {
  const { page, take } = data;

  const skip = (page - 1) * take;

  return {
    skip,
    take,
  };
};
