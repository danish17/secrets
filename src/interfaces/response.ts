import { HttpStatus } from '@nestjs/common';

export interface ICommonResponse {
  message: string;
  status: HttpStatus;
}
