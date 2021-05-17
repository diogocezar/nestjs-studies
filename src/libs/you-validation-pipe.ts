import { PipeTransform, Injectable } from '@nestjs/common';
import * as Yup from 'yup';
import { HttpException, HttpStatus } from '@nestjs/common';

export interface ValidationExceptionParams {
  errors: string[];
}
export class ValidationException extends HttpException {
  constructor(params: ValidationExceptionParams) {
    super(params, HttpStatus.BAD_REQUEST);
  }
}

@Injectable()
class YupValidationPipe implements PipeTransform {
  constructor(private schema: Yup.AnyObjectSchema) {}
  async transform(value: unknown) {
    console.log(value);
    const validation = await this.schema
      .validate(value, {
        abortEarly: false,
      })
      .catch((err) => ({
        errors: err.errors,
      }));
    if (validation?.errors) {
      const { errors } = validation;
      throw new ValidationException({
        errors,
      });
    }
    return validation;
  }
}
export { Yup, YupValidationPipe };
