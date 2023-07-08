import { HttpStatus } from '@nestjs/common';

export const Response = {
  OK: {
    message: 'Operation done.',
    status: HttpStatus.OK,
  },
  NOT_FOUND: {
    message: 'Secret not found.',
    status: HttpStatus.NOT_FOUND,
  },
  DELETED: {
    message: 'Secret Deleted.',
    status: HttpStatus.OK,
  },
  DATA_MISSING: {
    message: 'Secret cannot be created.',
    status: HttpStatus.BAD_REQUEST,
  },
  EXPIRED: {
    message: 'Secret has expired.',
    status: HttpStatus.FORBIDDEN,
  },
  UNAUTHORIZED: {
    message: 'Secret passphrase does not match.',
    status: HttpStatus.UNAUTHORIZED,
  },
};
