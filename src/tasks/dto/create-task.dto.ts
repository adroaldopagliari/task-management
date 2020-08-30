import { IsNotEmpty } from 'class-validator';

export default class CreateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
