import { PipeTransform, BadRequestException } from '@nestjs/common';
import TaskStatus from '../task-status.enum';

export default class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: string): string {
    const valueToUpperCase = value.toUpperCase();

    if (!this.isStatusValid(valueToUpperCase)) {
      throw new BadRequestException(`${valueToUpperCase} is an invalid status`);
    }

    return valueToUpperCase;
  }

  private isStatusValid(status: any): boolean {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
