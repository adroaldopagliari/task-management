import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  /*@Get()
  @UsePipes(ValidationPipe)
  getTasks(@Query() filterDTO: GetTasksFilterDTO): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getTasksWithFilters(filterDTO);
    }

    return this.tasksService.getAllTasks();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    const task = this.tasksService.createTask(createTaskDTO);

    return task;
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Task {
    const task = this.tasksService.updateTaskStatus(id, status);

    return task;
  }*/

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    const task = await this.tasksService.getTaskById(id);

    return task;
  }
}
