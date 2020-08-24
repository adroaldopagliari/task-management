import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}

  @Get()
  getTasks(@Query() filterDTO: GetTasksFilterDTO): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getTasksWithFilters(filterDTO);
    }

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const task = this.tasksService.getTaskById(id);

    return task;
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    const task = this.tasksService.createTask(createTaskDTO);

    return task;
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Task {
    const task = this.tasksService.deleteTask(id);

    return task;
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus
    ): Task {
    const task = this.tasksService.updateTaskStatus(id, status);

    return task;
  }
}
