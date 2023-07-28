import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`${metadata.data} should not be empty`);
    }

    if (metadata.type === 'param' && !isValidObjectId(value)) {
      throw new BadRequestException(`${metadata.data} is not valid`);
    }

    return value;
  }
}
