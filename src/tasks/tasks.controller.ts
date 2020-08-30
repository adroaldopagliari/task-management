import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import User from 'src/auth/user.entity';
import GetUser from 'src/auth/get-user.decorator';
import TasksService from './tasks.service';
import CreateTaskDTO from './dto/create-task.dto';
import GetTasksFilterDTO from './dto/get-tasks-filter.dto';
import TaskStatusValidationPipe from './pipes/task-status-validation.pipe';
import Task from './task.entity';
import TaskStatus from './task-status.enum';

@Controller('tasks')
@UseGuards(AuthGuard())
export default class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query(ValidationPipe) filterDTO: GetTasksFilterDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDTO, user);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    const task = await this.tasksService.getTaskById(id, user);

    return task;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    const task = this.tasksService.createTask(createTaskDTO, user);

    return task;
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    const task = await this.tasksService.updateTaskStatus(id, status, user);

    return task;
  }
}
