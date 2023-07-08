import { HttpStatus } from '@nestjs/common';

export const Response = {
  OK: {
    message: 'Operation done.',
    status: HttpStatus.OK,
  },
  DELETED: {
    message: 'Secret Deleted.',
    status: HttpStatus.OK,
  },

  DATA_MISSING: {
    message: 'Secret cannot be created.',
    status: HttpStatus.BAD_REQUEST,
  },
};
